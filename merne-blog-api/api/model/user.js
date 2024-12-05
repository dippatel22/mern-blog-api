const mongoose = require("mongoose");

const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
name:{
    type:String,
    require:true,
    unique:true
},
email:{
    type:String,
    require:true,
    unique:true
},
password:{
    type:String,
    require:true,

}
},{timestamps:true});


module.exports=mongoose.model('user',userSchema);