const express = require('express');
const router= express.Router();
const Razorpay = require('razorpay');
const hash_it = require('./hash_it');
const ordermodel = require('../models/orders');

var instance = new Razorpay({ key_id: 'rzp_test_jIXgi5QQd9yr3s', key_secret: 'h6dDj6WM1VS4wDAUMusjY2uJ' })

router.post('/create',(req, res)=>{
    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: `${req.body.product_id}${req.body.user_id}`,
        notes : req.body.notes
      };
      instance.orders.create(options, function(err, order) {
        res.send(order);
      });
})

router.post('/verify',(req, res)=>{
  var Razorpay_payment_id = req.body.razorpay_payment_id;
  var order_id = req.body.order_id;
  var razorpay_signature = req.body.razorpay_signature;

  //console.log(Razorpay_payment_id+'\n' +order_id + '\n' +razorpay_signature)
  
  var verify = hash_it(`${order_id}|${Razorpay_payment_id}`,'h6dDj6WM1VS4wDAUMusjY2uJ');

  //console.log(verify + '\n'+req.body.razorpay_signature)

  /*------------------------ creating order ----------------------*/
  if(verify===razorpay_signature){
    console.log(req.body);

    var order = new ordermodel({
      product_id : req.body.order.product_id,
      Order_id : req.body.order_id,
      User_id : req.body.order.user_id,
      payment_id : req.body.razorpay_payment_id,
      color : req.body.order.color[0],
      material : req.body.order.material[0],
      total_price : req.body.order.final_price,
      price_paid : req.body.order.amount_paid,
      Address : req.body.order.Address,
      Mobile : req.body.order.Mobile,
      status : 'order placed'
    });
    order.save();

    res.send('payment succesfull.. order placed')
  }else{
    res.send('payment unsuccesfull');
  }
})



module.exports = router;