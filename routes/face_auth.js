const express = require('express');
const router = express.Router();
const User = require('../db/schema');
const { requireAuth } = require('../middlewares/authToken');
const cp = require("child_process");
const spawn = require("child_process").spawn;

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
        console.log(image64.length);
        
        // // to change dir to parent
        // await cp.exec("cd ..",function(error,stdout,stderr){
        // });

        // // to change dir to face-authentication
        // await cp.exec("cd face-authentication",function(error,stdout,stderr){
        // });

        // executing the py file
        // async function verifyImage(image64){
        //     try{
        //         const pythonProcess = spawn('python',["../face-authentication/verify.py"]);

        //         //console.log(pythonProcess);

        //         pythonProcess.stdin.write(image64);
        //         pythonProcess.stdin.end();
        //         pythonProcess.stdout.on('data', (data) => {
        //             console.log(data);
        //         });
        //     }catch(err){
        //         console.log(err);
        //     }
        // }
        // await verifyImage(image64);

        const userDetails = await User.findOne({studentid: studentid}).exec();
        userDetails.faceRecognitionImage.push(image64);
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