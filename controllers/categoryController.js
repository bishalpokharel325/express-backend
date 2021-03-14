const categoryModel=require('../models/categoryModel')
const userModel=require('../models/userModel')
exports.postCategory=(req,res)=>{
const newcategory=new categoryModel(req.body)
let role=0
const signeduser=userModel.findById(req.auth._id)
.then((data)=>{
    role=parseInt(data.role)
})
const all_category=categoryModel.findOne({name:newcategory.name})
.then((data)=>{
    if(data){
        res.json(data.name+" category already exist. Please try new category name")
    }
    else{
        console.log(role)
        if(role==1){
            newcategory.save().then((postdata)=>{
            res.json(postdata)
        })
        }
        else{
            res.json("No Admin Previliage")
        }
        
    }
})
}

exports.getCategory=(req,res)=>{
    const all_Category=categoryModel.find().sort({name:1})
    .then((data)=>{
        res.json(data)
    })
}