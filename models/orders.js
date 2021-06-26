const mongoose = require('mongoose');
const schema= mongoose.Schema;

const orderschema = new schema({
    product_id : String,
    Order_id : String,
    User_id : String,
    payment_id : String,
    color : String,
    material : String,
    total_price : Number,
    price_paid : Number,
    Address : Object,
    Mobile : String,
    status : String
})

var ordermodel = mongoose.model('ordermodel',orderschema);
module.exports = ordermodel;