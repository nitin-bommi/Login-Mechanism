const express = require('express');
const router = express.Router();
const User = require('./db/schema');
require('dotenv').config({path:'./config/config.env'});
const { requireAuth } = require('./middlewares/authToken');

router.get('/', (req, res)=>{
    res.send("Hi, it works");
})

//Gets all user details to be displayed from database based on ID.
router.get('/userdetails', requireAuth, async (req, res)=>{
    try{
        const id = req.decoded.id;
        let userDetails= await User.findOne({id: id}).exec(); 
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
        const id= await req.body.id;
        let userDetails= await User.findOne({id: id}).exec();

        // if any error while executing above query, throw error
        if (!userDetails) {
            res.status(400).json({
                message: "ID not found, please register."
            })
        };
    
        // if there is no error, you have the result
        const token = jwt.sign({ id }, process.env.JWT_SECRET);
        res.status(200).json({ 
            result: userDetails,
            message: "ID is found."
        })                
            
    }catch(error){
        console.log(error);
    }

})

// If ID is present, login with password.
router.post('/passwordlogin',requireAuth, async (req, res)=>{
    try{
        const id= await req.decoded.id;
        //Gets password from body
        const password=await req.body.password;
        let userDetails=await User.findOne({id:id}).exec();      
        // if any error while executing above query, throw error
        if (!userDetails) {
            res.status(400).json({
                message: "ID not found, please register."
            })
        };
        user.comparePassword(password, (error, match) => {
            if(error) throw error;
            if(!match) {
              res.json({message: "Incorrect password"});
            }else{
                // console.log("ENV is " + process.env.JWT_SECRET);
                //create token to store ID.
                const token = jwt.sign({ id }, process.env.JWT_SECRET);
                // console.log(jwt.decode(token));
                res.status(200).json({ 
                    result: userDetails, 
                    token: token 
                })
                //res.cookie('jwt', token, { httpOnly: true });
            }
        });
    }catch(error){
        console.log(error);
    }

})

//If ID is not present, then register basic details.
router.post('/basic_registration', requireAuth, async (req, res) => {
    try{
        const id=req.decoded.id;
        const { firstName, lastName, email, password } = await req.body;
        const userDetails=new User({
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
        
        if (err) {
            throw err;
        } else {
            await userDetails.save();
            res.status(200).json({
                success: true,
                results: result,
                message: "Insertion success"
            })
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            error: err,
            message: "Insertion failed"
        })
    }
});

//Register more details.
router.post('/info_registration',requireAuth, async (req, res) => {
    try{
        const id=req.decoded.id;
        const { gender, school, department, year, semester, dob, phonenumber } = await req.body;
        const userDetails=User.findOne({id: id}).exec();
        userDetails.gender=gender;
        userDetails.school=school;
        userDetails.department=department;
        userDetails.yearOfJoin=year;
        userDetails.semester=semester;
        userDetails.dateOfBirth=dob;
        userDetails.phone=phonenumber;
            
        await userDetails.save();
        res.status(200).json({ 
            success: true,
            results: result,
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
