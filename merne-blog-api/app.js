const express=require('express');
const app=express();
const mongoose=require('mongoose');
const categoryRout=require('./api/routs/category');
const blogRout=require('./api/routs/blog');
const bodyParser=require('body-parser');
const fileUplaod=require('express-fileupload');
const userRout=require('./api/routs/user')
mongoose.connect('')
.then(res=>{
    console.log('connected');
})
.catch(err=>{
    console.log(err);
});

app.use(fileUplaod({
    useTempFiles:true
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/blog',blogRout);
app.use('/category',categoryRout);
app.use('/user',userRout);

app.get('*',(req,res)=>{
    res.status(200).json({
        msg:'bed request'
    })
})
module.exports=app;
