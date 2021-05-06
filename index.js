const Express= require('express');
const bodyparser=require('body-parser');
const key=require('./config/default.json');
const cors=require('cors');

const userrouter=require('./routes/users');
const productrouter=require('./routes/product');
const suggesstionrouter=require('./routes/suggestion');
const requestbuild= require('./buildrequest/buildrequest');

const db=key.mongoURI;
const mongoose=require('mongoose');
const { MulterError } = require('multer');

const app=Express();
app.use(cors());
app.use(bodyparser.json());
const port=8000;

mongoose.connect(db,
    { useNewUrlParser: true,
        useUnifiedTopology: true }
    )
.then(()=>{console.log('database connected...')})
.catch(err=>{console.log('connection failed...'); console.log(err)})

app.listen(port,()=>{
    console.log(`server listening at port ${port}...`);
    console.log('mongodb');
})
app.get('/',(req,res)=>{
    res.send('wellcome ...')
})

app.use('/users',userrouter);
app.use('/product',productrouter);
app.use('/suggestion',suggesstionrouter);
app.use('/requestbuild',requestbuild);
