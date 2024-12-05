const mongoose = require("mongoose");

const categorySchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
name:{
    type:String,
    require:true,
    unique:true
}
},{timestamps:true});


module.exports=mongoose.model('category',categorySchema);