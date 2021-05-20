const express = require('express');
const router= express.Router();

const productmodel=require('../models/productmodel');

//request for a product with id
router.get('/:productid',(req,res)=>{
    productmodel.findById(req.params.productid)
    .then(product=>res.json(product))
    .catch(err=>console.error(err));
})
router.post('/find/',(req,res)=>{
    productmodel.find(
        {"material":req.body.category}, 'product_name price'
    ).then((products)=>{res.json(products)})
    .catch(err=>console.log(err));
})

//creating product
router.post('/',(req,res)=>{
    var product=new productmodel({
        product_name:req.body.product_name,
        color       :req.body.color,
        price       :req.body.price,
        description :req.body.description,
        category    :req.body.category,
        material    :req.body.material,
    });
    product.save()
    .then(product=>{res.send('product created...')});
})

module.exports = router;