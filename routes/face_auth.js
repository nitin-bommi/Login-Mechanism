const express = require('express');
const router = express.Router();
const User = require('../db/schema');
const { requireAuth } = require('../middlewares/authToken');
const axios=require('axios');
const cp = require("child_process");
const spawn = require("child_process").spawn;

router.post('/face_sign_in', requireAuth, async(req,res)=>{
    try{
        const studentid = await req.decoded.studentid;
        const image64 = await req.body.image64;
        console.log(image64.length);
        const res = await axios.post("http://localhost:5000/verify", {'id': studentid, 'image64':image64});
        console.log(res.data);
        if(res.data.success){
            res.status(200).json({
                message: "Face has been verified, user is valid",
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
        const studentid = await req.decoded.studentid;
        const image64 = await req.body.image64;
        const counter = await re.body.counter;
        console.log(image64.length);
        const res = await axios.post("http://localhost:5000/signup", {'id': studentid, 'image64':image64, 'counter': counter})
        console.log(res.data);
        if(res.data.success){
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