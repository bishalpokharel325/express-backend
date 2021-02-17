const mongoose=require('mongoose')
const {userModel}=require('../models/userModel')
exports.postUser=(req,res)=>{
    const newuser=new userModel(req.body)
    .save()
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
}
exports.getUser=(req,res)=>{
const all_user=userModel.find()
.then((data)=>{
    res.json(data)
})
.catch((err)=>{
    res.json(err)
})
}
