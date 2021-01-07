const express = require('express');
const router = express.Router();
const User = require('../db/schema');
const { requireAuth } = require('../middlewares/authToken');

router.post('/face_sign_in',requireAuth,async(req,res)=>{

})
router.post('/face_sign_up',requireAuth, async(req,res)=>{
    
})

module.exports= router;