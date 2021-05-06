const express=require('express');
const router=express.Router();
const multer= require('multer');
var storage=multer.diskStorage({
    destination:'buildrequest/requestimages/',
    filename:(req, file, cb)=>{
        console.log(file);
        var suffix=new Date(Date.now()).toDateString();
        cb(null, suffix + ` ${file.originalname}`);
    }
})
function handler(req){
    console.log(req.body);
}
var upload=multer({storage:storage})
router.post('/',upload.single('user_file'),(req,res)=>{
    handler(req);
      //console.log();
      res.status(200).send(req.file)
})

module.exports=router; 