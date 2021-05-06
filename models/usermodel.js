const mongoose = require('mongoose');
const schema= mongoose.Schema;

//creating new schema
const userschema= new schema({
    username:String,
    age     :Number,
    password:String
})

var usermodel=mongoose.model('usermodel',userschema);
module.exports=usermodel;