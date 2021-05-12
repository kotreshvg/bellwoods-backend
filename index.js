const Express= require('express');
const bodyparser=require('body-parser');
const cors=require('cors');

const userrouter=require('./routes/users');
const productrouter=require('./routes/product');
const suggesstionrouter=require('./routes/suggestion');
const requestbuild= require('./buildrequest/buildrequest');

const db=process.env.mongoURI || "mongodb+srv://kotresh001:icrPIZWk4055phyu@cluster0.bvrtv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT=process.env.PORT || 8000;

const mongoose=require('mongoose');
const { MulterError } = require('multer');

const app=Express();
app.use(cors());
app.use(bodyparser.json());

mongoose.connect(db,
    { useNewUrlParser: true,
        useUnifiedTopology: true }
    )
.then(()=>{console.log('database connected...')})
.catch(err=>{console.log('connection failed...'); console.log(err)})

app.listen(PORT,()=>{
    console.log(`server listening at port ${PORT}...`);
    console.log('mongodb');
})
app.get('/',(req,res)=>{
    res.send('wellcome ...')
})

app.use('/users',userrouter);
app.use('/product',productrouter);
app.use('/suggestion',suggesstionrouter);
app.use('/requestbuild',requestbuild);
