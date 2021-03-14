const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema
const tokenSchema=new mongoose.Schema({
    userId:{
        type:ObjectId,
        required:true,
        ref:"user"
    },
    token:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:3600,
    }
})
module.exports=mongoose.model('token',tokenSchema)
