const mongoose = require('mongoose');
const schema= mongoose.Schema;

//creating new schema
const suggestionschema= new schema({
    suggestion:{type:String, required:true},
    mobile    :{type: Number, required:true}
})

var  suggestionmodel=mongoose.model('suggestionmodel',suggestionschema);
module.exports=suggestionmodel;