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

router.post('/addevent', requireAuth, async(req,res)=>{


})
module.exports = router;