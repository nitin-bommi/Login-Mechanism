const express = require('express');
const router = express.Router();
const Event = require('../db/eventschema');
const { requireAuth } = require('../middlewares/authToken');

router.get('/allevents', async (req, res)=>{
    try{
        const events = await Event.find({}).exec(); 
        res.status(200).json({ events });
    }catch(error){
        res.json({
            success: false,
            error: error,
            message: "Couldn't retrieve details"
        })
    }
});

router.post('/addevent', async(req,res)=>{
    try{   
        const { start, end, title } = await req.body;
        const eventDetails=new Event({
            start: start,
            end: end,
            title: title
        })
        
        await eventDetails.save();
        res.status(200).json({
            success: true,
            results: eventDetails,
            message: "Insertion success"
        })
        
    }catch(err){
        console.log(err);
        res.status(200).json({
            error: err,
            message: "Insertion failed"
        })
    }


})
module.exports = router;