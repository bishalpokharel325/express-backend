const mongoose=require('mongoose')
const {productModel}=require('../models/productModel')
exports.postProduct=(req,res)=>{
    console.log(req)
    const newproduct=new productModel({
        image:req.file.path,
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        quantity:req.body.quantity,
        rating:req.body.rating,
        category:req.body.category
    })
    .save()
    .then((products)=>{
        res.json(products)
    })
}
exports.getProduct=(req,res)=>{
    const min_price=req.query.min_price
    const max_price=req.query.max_price
    const min_rating=req.query.min_rating
    const max_rating=req.query.max_rating
    const all_products=productModel.find().sort({createdAt:1})
    if(min_price){
        all_products.find({
            price:{
                $gte:min_price
            }
        })
    }
    if(max_price){
        all_products.find({
            price:{
                $lte:max_price
            }
        })
    }
    if(max_rating){
        all_products.find({
            rating:{
                $lte:max_rating
            }
        })
    }
    if(min_rating){
        all_products.find({
            rating:{
                $gte:min_rating
            }
        })
    }
    all_products.sort({createdAt:-1})
    .then((products)=>{
        setTimeout(()=>{
             res.json({products})
        },2000)
       
    })
    .catch((error)=>{
        res.json({message:error})
    })
}

