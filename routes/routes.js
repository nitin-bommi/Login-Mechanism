const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require('../db/schema');
const { requireAuth } = require('../middlewares/authToken');

router.get('/', (req, res)=>{
    res.send("Hi, it works");
})

//Gets all user details to be displayed from database based on ID.
router.get('/userdetails', requireAuth, async (req, res)=>{
    try{
        const studentid = req.decoded.studentid;
        let userDetails= await User.findOne({studentid: studentid}, { password:0 }).exec(); 
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
        const studentid= await req.body.studentid;
        let userDetails= await User.findOne({studentid: studentid}).exec();
        console.log(studentid);
        const token = jwt.sign({ studentid: studentid }, process.env.JWT_SECRET);
        // if any error while executing above query, throw error
        if (!userDetails) {
<<<<<<< HEAD
            res.json({
                success: false,
=======
            res.status(401).json({
>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
                message: "ID not found, please register.",
                token: token
            })
        }else{
            // if there is no error, you have the result
<<<<<<< HEAD
            res.json({ 
                success: true,
=======
            res.status(200).json({ 
>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
                result: userDetails.studentid,
                message: "ID is found.",
                token: token
            }) 
        }                          
    }catch(error){
        console.log(error);
    }

})

// If ID is present, login with password.
<<<<<<< HEAD
router.post('/passwordlogin', requireAuth, async (req, res)=>{
=======
router.post('/passwordlogin',requireAuth, async (req, res)=>{
>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
    try{
        const studentid= await req.decoded.studentid;
        //Gets password from body
        const password=await req.body.password;
        let userDetails=await User.findOne({studentid: studentid}).exec();      
        // if any error while executing above query, throw error
        if (!userDetails) {
            res.status(400).json({
                message: "ID not found, please register."
            })
        };
<<<<<<< HEAD
        userDetails.comparePassword(password, (error, match) => {
            if(error) throw error;
            if(!match) {
              res.json({success: false,message: "Incorrect password"});
            }else{        
                res.status(200).json({ 
                    success: true,
=======
        user.comparePassword(password, (error, match) => {
            if(error) throw error;
            if(!match) {
              res.json({message: "Incorrect password"});
            }else{        
                res.status(200).json({ 
>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
                    result: userDetails.studentid,  
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
        const studentid= await req.decoded.studentid;
        console.log(studentid);
        const { firstName, lastName, email, password } = await req.body;
        const userDetails=new User({
            studentid: studentid,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
        
        
        await userDetails.save();
        res.status(200).json({
            success: true,
            results: userDetails,
            message: "Insertion success"
        })
        
    }catch(err){
        console.log(err);
<<<<<<< HEAD
        res.status(200).json({
=======
        res.status(400).json({
>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
            error: err,
            message: "Insertion failed"
        })
    }
});

//Register more details.
router.post('/info_registration',requireAuth, async (req, res) => {
    try{
        const studentid=req.decoded.studentid;
<<<<<<< HEAD
        const { gender, school, department, semester, dob, phonenumber,yearOfJoin } = await req.body;
=======
        const { gender, school, department, year, semester, dob, phonenumber } = await req.body;
>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
        const userDetails= await User.findOne({studentid: studentid}).exec();
        userDetails.gender=gender;
        userDetails.school=school;
        userDetails.department=department;
<<<<<<< HEAD
        userDetails.semester=semester;
        userDetails.dateOfBirth=dob;
        userDetails.phone=phonenumber;
        userDetails.yearOfJoin = yearOfJoin;
=======
        userDetails.yearOfJoin=year;
        userDetails.semester=semester;
        userDetails.dateOfBirth=dob;
        userDetails.phone=phonenumber;
            
>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
        await userDetails.save();
        res.status(200).json({ 
            success: true,
            results: userDetails,
            message: "Insertion success"
        })
        //res.redirect("/checkid");
    }catch(error){
        console.log(error);
        res.status(400).json({
            error: error,
            message: "Insertion failed"
        })
    }
})
module.exports = router;
