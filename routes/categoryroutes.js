const express=require('express')
const router=express.Router()
const {postCategory}=require("../controllers/categoryController")
const {getCategory}=require("../controllers/categoryController")
router.post("/category",postCategory)
router.get("/category",getCategory)
module.exports=router