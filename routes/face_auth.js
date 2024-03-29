const express = require('express');
const router = express.Router();
const User = require('../db/userschema');
const jwt = require("jsonwebtoken");
const { requireAuth } = require('../middlewares/authToken');
const axios = require('axios');

router.post('/face_sign_in', requireAuth, async(req,res)=>{
    try{
        const userid = await req.decoded.userid;
        //Somehow token is not there in the cookie
        if(!userid){
          return res.status(200).json({
            success: true,
            error: "token"
          })
        }
        let userDetails = await User.findOne({userid: userid}).exec();
        const role = userDetails.role;
        const image64 = await req.body.image64;
        console.log(image64.length);
        const response = await axios.post("http://localhost:5000/verify", {'id': userid, 'image64':image64});
        console.log(response.data);
        console.log(response.data.success);
        console.log(response.data.message);
        if(response.data.success){
            res.clearCookie('token');
            const token = jwt.sign({ userid: userid, role: role }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.cookie('token',token, {maxAge: 86400000, httpOnly: true});
            res.status(200).json({
                message: "Face has been verified, user is valid",
                result: { role },
                success: true,
            })
        }else{
            res.status(200).json({
                message: "Face not detected or face not registered in database.",
                success: false,
            })
        }
    }catch(err){
        console.log(err);
    }
});

router.post('/face_sign_up', requireAuth, async(req,res)=>{
    try{
        const userid = await req.decoded.userid;
        const image64 = await req.body.image64;
        console.log(image64.length);
        const response = await axios.post("http://localhost:5000/register", {'id': userid, 'image64':image64})
        console.log(response.data);
        console.log(response.data.success);
        console.log(response.data.message);
        if(response.data.success){
            res.status(200).json({
                message: "Image saved successfully",
                success: true,
            })
        }else{
            res.status(200).json({
                message: "Face not detected in image",
                success: false,
            })
        }
    }catch(err){
        console.log(err);
    }
})

module.exports = router;
