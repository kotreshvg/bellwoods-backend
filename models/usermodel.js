const mongoose = require('mongoose');
const schema= mongoose.Schema;

//creating new schema
const userschema= new schema({
    username:String,
    mobile    :Number,
    password:String,
    email    :String,
    address:{
        pin:Number,
        district:String,
        taluk:String,
        city:String,
        location:String
    }
})

var usermodel=mongoose.model('usermodel',userschema);
module.exports=usermodel;