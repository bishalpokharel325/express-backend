const mongoose=require('mongoose')
const categorySchema=new mongoose.Schema({
    name:{
        required:"Category name is required",
        type:String,
        trim:true,
        unique:"Dublicate category name"
    }
},{timestamps:true})
module.exports=mongoose.model("category",categorySchema)