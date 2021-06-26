const express = require('express');
const router= express.Router();
const hash_it = require('./hash_it');
const usermodel=require('../models/usermodel');

//users get req shows all users
router.get('/',(req,res)=>{
    usermodel.find()
    .then(console.log('user data requested'))
    .then((user)=>res.send('youre not authorised to view this information'));
})

//get user with id
router.get('/:userid',(req,res)=>{
    usermodel.findById(req.params.userid)
    .select('username').then(name=>res.json(name))
    .catch(err=>console.error(err));
})
//------------------------------login user-------------------------------
router.post('/login',(req, res)=>{
    var password = hash_it(req.body.password, 'Belluser');
    var username = req.body.username;
    usermodel.find({'username' : username, 'password' : password}, {username:1})
    .then((doc)=>{
        console.log(doc.length)
        if(doc.length===1){
            res.json({
                username : doc[0].username,
                token : Date.now(),
                message : 'succesfully logged in'
            });
        }else {
            res.json({
                username : null,
                token : null,
                message : 'failed attempt, provide authenticate details'
            })
        }
    })
})

//post new user to database
router.post('/create',(req,res)=>{
    var hash_pass = hash_it(req.body.password, 'Belluser')
    var user=new usermodel({
        username:req.body.username,
        mobile    :req.body.mobile,
        password:hash_pass,
        email   :req.body.email,
        address:{
            pin:req.body.address.pin,
            district:req.body.address.district,
            taluk:req.body.address.taluk,
            city:req.body.address.city,
            location:req.body.address.location           
        }
    });
    user.save()
    .then(user=>{res.send('user signup successfull...');
console.log(`new user signup ${user.username}`)});
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