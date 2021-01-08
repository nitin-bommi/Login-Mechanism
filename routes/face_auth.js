const express = require('express');
const router = express.Router();
const User = require('../db/schema');
const { requireAuth } = require('../middlewares/authToken');

router.post('/face_sign_in', requireAuth, async(req,res)=>{
    try{
        const studentid = await req.decoded.studentid;
        const userDetails = await User.findOne({studentid: studentid}).exec();
        const image=userDetails.faceRecognitionImage;
        res.status(200).json({
            image: image,
            success: true,
        })
    }catch(err){
        console.log(err);
    }
});

router.post('/face_sign_up', requireAuth, async(req,res)=>{
    try{
        const studentid = await req.decoded.studentid;
        const userDetails = await User.findOne({studentid: studentid}).exec();
        userDetails.faceRecognitionImage ='Bleh';
        await userDetails.save();
        res.status(200).json({
            message: "Image saved successfully",
            success: true,
        })
    }catch(err){
        console.log(err);
    }
})

module.exports= router;