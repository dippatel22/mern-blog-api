const express = require('express');
const router = express.Router();
const Blog = require('../model/blog');
const mongoose = require('mongoose');
const { route } = require('./category');
const cloudinary=require('cloudinary').v2;
const checkAuth=require('../middleware/cheackAuth');
const category = require('../model/category');

cloudinary.config({
    cloud_name:'',
    api_key:'',
    api_secret:''
});
// post new data
router.post('',checkAuth,(req,res)=>{
   const file=req.files.photo;
   cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
    console.log(result);
    const blog=new Blog({
        _id:new mongoose.Types.ObjectId,
        title:req.body.title,
        discription:req.body.discription,
        author:req.body.author,
        category:req.body.category,
        photo:result.url
    })
    blog.save()
    .then(
        result=>{
            res.status(200).json({
                new_blog:result
            })
        }
    ).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
   })
})

// get data

router.get('', checkAuth,(req, res) => {
    Blog.find()
        .then(result => {
            res.status(200).json({
                blogs: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

//get by category

router.get('/category/:category',(req,res)=>{
    Blog.find({category:req.params.category}).then(result => {
        res.status(200).json({
            blog: result
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})

//get by author


router.get('/author/:author',(req,res)=>{
    Blog.find({author:req.params.author}).then(result => {
        res.status(200).json({
            blog: result
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})

// get by id

router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(result => {
            res.status(200).json({
                blog: result
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

// update

router.put('/:id',checkAuth,(req,res)=>{
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
        Blog.findByIdAndUpdate({ _id: req.params.id },{
            $set:{
                title:req.body.title,
                discription:req.body.discription,
                author:req.body.author,
                photo:result.url,
                category:req.body.category
            }
        }) .then(result => {
    
            res.status(200).json({
                updated_result: result
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
    })
   
})

// delete data

router.delete('/:id',checkAuth,(req, res, next) => {
    const imageUrl=req.query.imageUrl;
    const urlArray=imageUrl.split('/');
    const image=urlArray[urlArray.length-1];
    const imageName=image.split('.');
    Blog.deleteOne({ _id: req.query.id })
        .then(result => {
cloudinary.uploader.destroy(imageName,(error,result)=>{
    console.log(error,result);
})
            res.status(200).json({
                message: "data deleted",
                result: result
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

module.exports=router;
