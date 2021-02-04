const express = require('express');
const router = express.Router();
const User = require('../db/userschema');
const { requireAuth } = require('../middlewares/authToken');
const axios=require('axios');

router.post('/face_sign_in', requireAuth, async(req,res)=>{
    try{
        const userid = await req.decoded.userid;
        const role = await req.decoded.role;
        const image64 = await req.body.image64;
        console.log(image64.length);
        const response = await axios.post("http://localhost:5000/verify", {'id': userid, 'image64':image64});
        console.log(response.data);
        console.log(response.data.success);
        console.log(response.data.message);
        if(response.data.success){
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

module.exports= router;