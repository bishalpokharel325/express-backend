const token = require("../models/token")
const crypto=require('crypto')
const userModel=require('../models/userModel')
const sendEmail = require("../utils/verifyemail")
exports.confirmEmail=(req,res)=>{
token.findOne({token:req.params.userToken},(error,token)=>{
if(!token){
    return res.status(400).json({
        error:"Invalid Token or token may have expired"
    })
}
userModel.findOne({
    _id:token.userId,
    
    email:req.body.email
},(error,user)=>{
    if(!user){
        return res.status(400).json({
            error:"The email provided is not associated with this token"
        })
    }

    if(user.isVerified){
        return res.status(400).json({error:"email is already verified, please log in"})
    }
    user.isVerified=true
    user.save((error,result)=>{
        if(error){
            return res.status(400).json({error:"Token is not verified"})
        }
        res.json({message:"Email is verified, You can log in to continue"})
    })
})
})
}
exports.resendTokenPost=(req,res)=>{
    userModel.findOne({email:req.body.email},(error,user)=>{
        if(!user){
            return res.status(400).json({error:"We were unable to find a user"})
        }
        if(user.isVerified) return res.status(400).json({error:"This account is already verified"})
        const Token=new token({
        userId:user._id,
        token:crypto.randomBytes(16).toString('hex')
    }).save((error,token)=>{
        if(error){
            res.status(400).json({error:error})
        }
        sendEmail({
            from:"no-reply@webapplication.com",
            to:user.email,
            subject:"Email Verification message",
            text:"Hello,\n\nPlease verify your account by clicking link below\n\n"+
            req.headers.host+"\/api\/confirmation\/"+token.token
        })
    })
        res.json("Token is resent in your email")
    })
    .catch((err)=>{
        res.json(err)
    })
}

exports.resendForgotPassword=(req,res)=>{
    userModel.findOne({email:req.body.email},(error,user)=>{
        if(!user){
            return res.status(400).json({error:"We were unable to find a user"})
        }
        const Token=new token({
        userId:user._id,
        token:crypto.randomBytes(16).toString('hex')
    }).save((error,token)=>{
        if(error){
            return res.status(400).json({error:error})
        }
        sendEmail({
            from:"no-reply@webapplication.com",
            to:user.email,
            subject:"Email Verification message",
            text:"Hello,\n\nPlease verify your account by clicking link below\n\n"+
            req.headers.host+"\/api\/forgotpassword\/"+token.token
        })
    })
        res.json("Token is Sent in your email")
    })
    .catch((err)=>{
        res.json(err)
    })
}

exports.forgotPassword=(req,res)=>{    
token.findOne({token:req.params.userToken},(error,token)=>{
if(!token){
    return res.status(400).json({
        error:"Invalid Token or token may have expired"
    })
}
userModel.findOne({
    _id:token.userId,
    email:req.body.email
},(error,user)=>{
    if(!user){
        return res.status(400).json({
            error:"The email provided is not associated with this token"
        })
    }
    user.password=req.body.password
    user.save((error,result)=>{
        if(error){
            return res.status(400).json({error:"Token is not verified"})
        }
        res.json({message:"Password Successfully changed"})
    })
})
})
}