const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../db/userschema");
const { requireAuth } = require("../middlewares/authToken");
const speakeasy = require("speakeasy");
const fs = require("fs");
const qrcode = require("qrcode");

router.get("/", (req, res) => {
  res.send("Hi, it works");
});
router.get("/getUserDetails", requireAuth, (req, res) => {
  res.json({ role: req.decoded.role, userid: req.decoded.userid });
});
//Get the ascii value for 2FA
router.get("/ascii", requireAuth, async (req, res) => {
  const user = await User.find({ userid: req.decoded.userid }).exec();
  console.log(user[0].secondLevel);
  res.json({ ascii: user[0].secondLevel.ascii });
});
//Logout
router.get("/logout", requireAuth, (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
});
//Update 2FA enabled flag
router.post("/enable2FA", requireAuth, async (req, res) => {
  const user = req.decoded.userid;
  await User.findOneAndUpdate({ userid: user }, { enabled: true }).exec();
});
router.post("/2fa", (req, res) => {
  const { otp, ascii } = req.body;
  const result = gValidate(otp, ascii);
  console.log(result);
  res.json({ authenticated: result });
});

function gValidate(otp, ascii) {
  var result = speakeasy.totp.verify({
    secret: ascii,
    encoding: "ascii",
    token: otp,
  });
  return result;
}

//Gets all user details to be displayed from database based on ID.
router.get("/userdetails", requireAuth, async (req, res) => {
  try {
    const userid = req.decoded.userid;
    let userDetails = await User.findOne(
      { userid: userid },
      { password: 0 }
    ).exec();
    res.status(200).json({ userDetails });
  } catch (error) {
    res.json({
      success: false,
      error: error,
      message: "Couldn't retrieve details",
    });
  }
});

//Checks if ID is present in database
router.post("/checkid", async (req, res) => {
  try {
    //ID is input in the body.
    const userid = await req.body.userid;

    if (userid === "") {
      res
        .status(400)
        .json({ success: false, message: "ID should not be blank " });
    } else if (!/(^\d{2}[a-zA-Z]{4}\d{2}$|^\d{5}$)/.test(req.body.userid)) {
      res.status(400).json({ success: false, message: "Invalid input" });
    }
    let userDetails = await User.findOne({ userid: userid }).exec();
    const token = jwt.sign({ userid: userid }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    res.cookie("token", token, { maxAge: 3600000, httpOnly: true });
    // if any error while executing above query, throw error
    if (!userDetails) {
      res.json({
        success: false,
        message: "ID not found, please register.",
        token: token,
      });
    } else {
      // if there is no error, you have the result
      res.json({
        success: true,
        result: userDetails.userid,
        message: "ID is found.",
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// If ID is present, login with password.
router.post("/passwordlogin", requireAuth, async (req, res) => {
  try {
    // Get userid decoded from token in header
    const userid = await req.decoded.userid;
    //Somehow token is not there in the cookie
    if (!userid) {
      return res.status(200).json({
        success: true,
        error: "token",
      });
    }
    //Gets password from body
    const password = await req.body.password;
    let userDetails = await User.findOne({ userid: userid }).exec();
    console.log(!userDetails);
    // if any error while executing above query, throw error
    if (!userDetails) {
      return res.status(400).json({
        message: "ID not found, please register.",
      });
    }
    const role = userDetails.role;
    userDetails.comparePassword(password, (error, match) => {
      if (error) throw error;
      if (!match) {
        res.json({ success: false, message: "Incorrect password" });
      } else {
        res.clearCookie("token");
        const token = jwt.sign(
          { userid: userid, role: role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        res.cookie("token", token, { maxAge: 86400000, httpOnly: true });
        res.status(200).json({
          success: true,
          result: {
            userid: userDetails.userid,
            role: userDetails.role,
          },
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//If ID is not present, then register basic details.
router.post("/basic_registration", requireAuth, async (req, res) => {
  console.log("before");
  try {
    console.log("äfter");
    const userid = await req.decoded.userid;
    var secret = speakeasy.generateSecret({
      name: userid,
    });
    console.log(secret);
    let role;
    if (/^\d{5}$/.test(userid)) {
      role = "Professor";
    } else {
      role = "Student";
    }
    console.log(userid);
    console.log(role);
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    } = await req.body;
    //Checking if other users has the same Email
    const oldUser = await User.find({ email }).exec();
    if (oldUser != "") {
      console.log("Old User is " + oldUser);
      //Email already exists
      return res.status(200).json({
        error: "email",
      });
    }
    const userDetails = new User({
      userid: userid,
      role: role,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phoneNumber,
      secondLevel: {
        ascii: secret.ascii,
      },
    });

    const data = await qrcode.toDataURL(secret.otpauth_url);
    //save to images folder
    var base64Data = data.replace(/^data:image\/png;base64,/, "");
    fs.writeFile(
      "../website-frontend/src/images/qr-codes" + userid + ".png",
      base64Data,
      "base64",
      function (err, res) {
        if (err) throw err;
        console.log("qr codesaved");
      }
    );
    await userDetails.save();
    res.status(200).json({
      success: true,
      results: userDetails,
      message: "Insertion success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
      message: "Insertion failed",
    });
  }
});

//Register more details.
router.post("/student_registration", requireAuth, async (req, res) => {
  try {
    const userid = req.decoded.userid;
    const {
      gender,
      school,
      department,
      course,
      semester,
      dob,
      yearOfJoin,
    } = await req.body;
    const userDetails = await User.findOne({ userid: userid }).exec();
    userDetails.gender = gender;
    userDetails.school = school;
    userDetails.department = department;
    userDetails.semester = semester;
    userDetails.dateOfBirth = dob;
    userDetails.course = course;
    userDetails.yearOfJoin = yearOfJoin;
    await userDetails.save();
    res.status(200).json({
      success: true,
      results: userDetails,
      message: "Insertion success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
      message: "Insertion failed",
    });
  }
});

router.post("/professor_registration", requireAuth, async (req, res) => {
  try {
    const userid = req.decoded.userid;
    const {
      gender,
      school,
      department,
      designation,
      dob,
      yearOfJoin,
    } = await req.body;
    const userDetails = await User.findOne({ userid: userid }).exec();
    userDetails.gender = gender;
    userDetails.school = school;
    userDetails.department = department;
    userDetails.designation = designation;
    userDetails.dateOfBirth = dob;
    userDetails.yearOfJoin = yearOfJoin;
    await userDetails.save();
    res.status(200).json({
      success: true,
      results: userDetails,
      message: "Insertion success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
      message: "Insertion failed",
    });
  }
});
module.exports = router;
