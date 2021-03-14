const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema
const orderItemSchema=new mongoose.Schema({
    quantity:{
        type:Number,
        required:true
    },
    productId:{
        type:ObjectId,
        required:true,
        ref:'products'
    }
},{timestamps:true})
module.exports=mongoose.model('orderitem',orderItemSchema)