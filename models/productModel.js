const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema
const productSchema=mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:"Title is required",
    },
    description:{
        type:String,
        trim:true,
        required:"Description is required"
    },
    price:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:1
    },
    category:{
        type:ObjectId,
        required:true,
        ref:'category'
    },

},{timestamps:true})
exports.productModel=mongoose.model("products",productSchema)