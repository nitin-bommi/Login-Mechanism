const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require('../db/userschema');
const { requireAuth } = require('../middlewares/authToken');

router.get('/', (req, res)=>{
    res.send("Hi, it works");
})

//Gets all user details to be displayed from database based on ID.
router.get('/userdetails', requireAuth, async (req, res)=>{
    try{
        const userid = req.decoded.userid;
        let userDetails= await User.findOne({userid: userid}, { password:0 }).exec();
        res.status(200).json({ userDetails });
    }catch(error){
        res.json({
            success: false,
            error: error,
            message: "Couldn't retrieve details"
        })
    }
})

//Checks if ID is present in database
router.post('/checkid',async (req, res)=>{
    try{
        //ID is input in the body.
        const userid = await req.body.userid;
        let role;
        if(userid===""){
            res.status(400).json({ success: false, message: "ID should not be blank "})
        }else if(!/(^\d{2}[a-zA-Z]{4}\d{2}$|^\d{5}$)/.test(req.body.userid)){
            res.status(400).json({ success: false, message: "Invalid input"})
        }
        let userDetails = await User.findOne({userid: userid}).exec();

        if(/^\d{5}$/.test(userid)){
            role='Professor';
        }else{
            role='Student';
        }
        const token = jwt.sign({ userid: userid, role: role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie('token',token, {maxAge: 86400000, httpOnly: false});
        // if any error while executing above query, throw error
        if (!userDetails) {
            res.json({
                success: false,
                message: "ID not found, please register.",
                token: token
            })
        }else{
            // if there is no error, you have the result
            res.json({
                success: true,
                result: userDetails.userid,
                message: "ID is found.",
                token: token
            })
        }
    }catch(error){
        console.log(error);
    }
})

// If ID is present, login with password.
router.post('/passwordlogin', requireAuth, async (req, res)=>{
    try{
        // Get userid decoded from token in header
        const userid = await req.decoded.userid;
        //Gets password from body
        const password = await req.body.password;
        let userDetails = await User.findOne({userid: userid}).exec();
        // if any error while executing above query, throw error
        if (!userDetails) {
            res.status(400).json({
                message: "ID not found, please register."
            })
        };
        userDetails.comparePassword(password, (error, match) => {
            if(error) throw error;
            if(!match) {
              res.json({success: false, message: "Incorrect password"});
            }else{
                res.status(200).json({
                    success: true,
                    result: {
                        userid: userDetails.userid,
                        role: userDetails.role,
                    }
                })
            }
        });
    }catch(error){
        console.log(error);
    }

})

//If ID is not present, then register basic details.
router.post('/basic_registration', requireAuth, async (req, res) => {
    try{
        const userid= await req.decoded.userid;
        const role = await req.decoded.role;

        console.log(userid);
        console.log(role);
        const { firstName, lastName, email, password, phonenumber } = await req.body;
        const userDetails=new User({
            userid: userid,
            role: role,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: phonenumber
        })


        await userDetails.save();
        res.status(200).json({
            success: true,
            results: userDetails,
            message: "Insertion success"
        })

    }catch(err){
        console.log(err);
        res.status(200).json({
            error: err,
            message: "Insertion failed"
        })
    }
});

//Register more details.
router.post('/student_registration',requireAuth, async (req, res) => {
    try{
        const userid=req.decoded.userid;
        const { gender, school, department, course, semester, dob, yearOfJoin } = await req.body;
        const userDetails= await User.findOne({userid: userid}).exec();
        userDetails.gender=gender;
        userDetails.school=school;
        userDetails.department=department;
        userDetails.semester=semester;
        userDetails.dateOfBirth=dob;
        userDetails.course=course;
        userDetails.yearOfJoin = yearOfJoin;
        await userDetails.save();
        res.status(200).json({
            success: true,
            results: userDetails,
            message: "Insertion success"
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            error: error,
            message: "Insertion failed"
        })
    }
})

router.post('/professor_registration', requireAuth, async (req, res) => {
    try{
        const userid=req.decoded.userid;
        const { gender, school, department, designation, dob, yearOfJoin } = await req.body;
        const userDetails= await User.findOne({userid: userid}).exec();
        userDetails.gender=gender;
        userDetails.school=school;
        userDetails.department=department;
        userDetails.designation=designation;
        userDetails.dateOfBirth=dob;
        userDetails.yearOfJoin=yearOfJoin;
        await userDetails.save();
        res.status(200).json({
            success: true,
            results: userDetails,
            message: "Insertion success"
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            error: error,
            message: "Insertion failed"
        })
    }
})
module.exports = router;
