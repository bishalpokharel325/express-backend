const express=require('express')
const router=express()
const {postUser}=require('../controllers/userController')
const {getUser}=require('../controllers/userController')
router.post('/users',postUser)
router.get('/users',getUser)
module.exports=router