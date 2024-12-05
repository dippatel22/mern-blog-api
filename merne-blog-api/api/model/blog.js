const mongoose = require("mongoose");

const blogSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
title:{
    type:String,
    require:true,
},
discripton:{
    type:String,
    require:true,
},
author:{
    type:String,
    require:true,
},
category:{
    type:String,
    require:true,
},
photo:String
},{timestamps:true});


module.exports=mongoose.model('blog',blogSchema);