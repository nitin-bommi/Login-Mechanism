const express = require('express');
const router = express.Router();
const Event = require('../db/eventschema');

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
        const savedEventDetails= await eventDetails.save();
        res.status(200).json({
            success: true,
            results: savedEventDetails,
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

router.post('/updateevent', async(req,res)=>{
    try{   
        const { eventid, start, end, title } = await req.body;
        const eventDetails= await Event.findOne({_id: eventid}).exec();
        eventDetails.start=start;
        eventDetails.end=end;
        eventDetails.title=title;
        const savedEventDetails= await eventDetails.save();
        res.status(200).json({
            success: true,
            results: savedEventDetails,
            message: "Update success"
        })
        
    }catch(err){
        console.log(err);
        res.status(200).json({
            error: err,
            message: "Update failed"
        })
    }
})

router.post('/deleteevent', async(req,res)=>{
    try{   
        const { eventid } = await req.body;
        const deletedEventDetails= await Event.findByIdAndDelete({ _id: eventid}).exec();
        res.status(200).json({
            success: true,
            results: deletedEventDetails,
            message: "Delete success"
        })
        
    }catch(err){
        console.log(err);
        res.status(200).json({
            error: err,
            message: "Delete failed"
        })
    }
})


module.exports = router;