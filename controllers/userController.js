const userModel=require('../models/userModel')
const JWT=require('jsonwebtoken')
const expressJwt=require('express-jwt')
const crypto=require('crypto')
const Token=require('../models/token')
const sendEmail = require('../utils/verifyemail')
exports.postUser=(req,res)=>{
    const newuser=new userModel(req.body)
    .save()
    .then((data)=>{
        const token=new Token({
        userId:data._id,
        token:crypto.randomBytes(16).toString('hex')
    }).save((error,token)=>{
        if(error){
            res.status(400).json({error:error})
        }
        sendEmail({
            from:"no-reply@webapplication.com",
            to:data.email,
            subject:"Email Verification message",
            text:"Hello,\n\nPlease verify your account by clicking link below\n\n"+
            req.headers.host+"\/api\/confirmation\/"+token.token
        })
    })
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
exports.signIn=(req,res)=>{
    const {email,password}=req.body
    userModel.findOne({email},
        (error,user)=>{
            if(error||!user){
                return res.status(400).json({error:"User email does not exist"})
            }else{
                if(!user.authenticate(password)){
                return res.status(400).json({
                    error:"Email or password does not match"
                })
            }
            }
            if(!user.isVerified){
                return res.status(400).json({
                    error:"Please verify your account before log in"
                })
            }
            const token=JWT.sign({_id:user._id},process.env.JWT_SECRET)
            res.cookie('ab',token,{expire:new Date()+9999})
            const {_id,name,username,role,email}=user
            return res.json({token,user:{_id,role,email}
            })
        }
       
    )
}
exports.signOut=(req,res)=>{
    res.clearCookie('ab')
    res.json({message:"signout success"})
}
exports.requireSignin=expressJwt({
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
    userProperty:"auth",
})
exports.userByid=(req,res,next,id)=>{
    userModel.findById(id).exec((error,user)=>{
        if(error||!user){
            res.status(400).json({error:"User not found"})
        }
        req.profile=user
        next();
    })
}
exports.userInfo=(req,res)=>{
    req.profile.hashed_password=undefined
    req.profile.salt=undefined
    console.log(req.profile._id)
    console.log(req.auth._id)
    if(req.profile._id==req.auth._id){
        res.json({
        user:req.profile
    })
    }
    else{
        res.json("Not Authorized")
    }
    
}
