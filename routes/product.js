const express = require('express');
const router= express.Router();

const productmodel=require('../models/productmodel');

//request for a product with id
router.get('/:productid',(req,res)=>{
    productmodel.findById(req.params.productid)
    .then(product=>res.json(product))
    .catch(err=>console.error(err));
})

//responds with an array of products when asked for specific category
router.post('/find/',(req,res)=>{
    productmodel.find(
        {"material":req.body.category}, 'product_name price'
    ).then((products)=>{res.json(products)})
    .catch(err=>console.log(err));
})

//creating product
//------------------------------image handling code---------------------
const multer= require('multer');
const { json } = require('body-parser');
var imagestore=multer.diskStorage({
    destination:(req, file, cb)=>{
        if(file.fieldname==='thumbnail'){
            cb(null, 'prod_images/thumbnails/')
        }
        else if(file.fieldname=='job_card'){
            cb(null, 'prod_images/job_card/')
        }
        else{
            cb(null,'prod_images/gallery/')
        }
    },
    //'prod_images/thumbnails/',
    filename:(req, file, cb)=>{
        cb(null, `BWF_${file.originalname}`);
    }
})
var productimg=multer({storage:imagestore});
var image_handler=productimg.fields([{name:'thumbnail', maxCount:1},{name:'gallery', maxCount:6},{name:'job_card',maxCount:1}]);
//-------------------------------------------------------------------------
//--------------------text handler to create data in db--------------------
var id;
var productcreator=(req, res)=>{
    var product=new productmodel({
        product_name:req.body.product_name,
        color       :JSON.parse(req.body.color),
        price       :JSON.parse(req.body.price),
        description :req.body.description,
        category    :JSON.parse(req.body.category),
        material    :JSON.parse(req.body.material),
        thumbnail   :req.files['thumbnail'][0].filename,
        gallery     :req.files['gallery'].map(file=>file.filename),
        job_card   :req.files['job_card'][0].filename,
        time_required:JSON.parse(req.body.time)
    });
    product.save()
    .then(
        product=>{
            id=product.id;
            res.send(`product created succesfully...${id}`).end()}
    );
}


router.post('/create/',/*(req, res)=>{
    console.log(req.body.color);
    res.send('executed succesful').end();
}*/image_handler, productcreator);

/*router.post('/',(req,res)=>{
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
})*/

module.exports = router;