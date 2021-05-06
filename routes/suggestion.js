const express = require('express');
const router= express.Router();

const suggestionmodel=require('../models/suggestionsmodel');

router.post('/',(req,res)=>{
    var suggestion = new suggestionmodel({
        suggestion:req.body.suggestion,
        mobile    :req.body.mobile
    });
    suggestion.save().then(res.send('received suggestion..')).then(()=>console.log('suggestion received'))
    .catch(err=>console.error(err));
})

module.exports=router;