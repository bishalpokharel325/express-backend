const categoryModel=require('../models/categoryModel')
exports.postCategory=(req,res)=>{
const newcategory=new categoryModel(req.body)
const all_category=categoryModel.findOne({name:newcategory.name})
.then((data)=>{
    if(data){
        res.json(data.name+" category already exist. Please try new category name")
    }
    else{
        newcategory.save().then((postdata)=>{
            res.json(postdata)
        })
    }
})
}

exports.getCategory=(req,res)=>{
    const all_Category=categoryModel.find().sort({name:1})
    .then((data)=>{
        res.json(data)
    })
}