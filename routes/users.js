const express = require('express');
const router= express.Router();

const usermodel=require('../models/usermodel');

//users get req shows all users
router.get('/',(req,res)=>{
    usermodel.find()
    .then(console.log('user data requested'))
    .then((user)=>res.json(user));
})

//get user with id
router.get('/:userid',(req,res)=>{
    usermodel.findById(req.params.userid)
    .select('username').then(name=>res.json(name))
    .catch(err=>console.error(err));
})

//post new user to database
router.post('/',(req,res)=>{
    var user=new usermodel({
        username:req.body.username,
        age     :req.body.age,
        password:req.body.password
    });
    user.save()
    .then(user=>res.json(user));
})

//update existing user credentials
//@implemented successfully
router.put('/modify/',(req,res)=>{
    filter={'_id': req.body._id};
    update={$set:req.body};
    usermodel.findOneAndUpdate(filter,update, {useFindAndModify: false, new:true},
    (err,user)=> err? console.error(err): res.json(user))
    .then(console.log(req.body._id+' succesfully updated'))
})


module.exports = router;