const express=require('express')
const router=express.Router()
const {postCategory}=require("../controllers/categoryController")
const {getCategory}=require("../controllers/categoryController")
const { requireSignin } = require('../controllers/userController')
router.post("/category",requireSignin,postCategory)
router.get("/category",getCategory)
module.exports=router