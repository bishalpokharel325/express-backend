const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema
const orderSchema=new mongoose.Schema({
    orderItems:[{
        type:ObjectId,
        required:true,
        ref:"orderitem"
    }],
    shippingAddress:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phoneno:{
        type:String,
        required:true
    },
    userId:{
        type:ObjectId,
        ref:'user',
        required:'true'
    },
    status:{
        type:String,
        required:true,
        default:'pending'
    },
    shipping_fee:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    orderAt:{
        type:Date,
        default:Date.now(),

    }
},{timestams:true})
module.exports=mongoose.model("order",orderSchema)