const express = require('express');
const router = express.Router();
const User = require('../db/schema');
const { requireAuth } = require('../middlewares/authToken');

router.post('/face_sign_in', requireAuth, async(req,res)=>{
    try{
        const studentid = await req.decoded.studentid;
        const image64 = await req.body.image64;
        
        const userDetails = await User.findOne({studentid: studentid}).exec();
        const image=userDetails.faceRecognitionImage;
        
        res.status(200).json({
            image: image,
            imagebody: image64,
            success: true,
        })
    }catch(err){
        console.log(err);
    }
});

router.post('/face_sign_up', requireAuth, async(req,res)=>{
    try{
        const studentid = await req.decoded.studentid;
        const image64 = await req.body.image64;
        
        const userDetails = await User.findOne({studentid: studentid}).exec();
        userDetails.faceRecognitionImage = image64;
        console.log('Image is saved in database');
        
        await userDetails.save();
        res.status(200).json({
            message: "Image saved successfully",
            image: image64,
            success: true,
        })
    }catch(err){
        console.log(err);
    }
})

module.exports= router;