const router=require('express').Router()
const {postProduct}=require('../controllers/productController')
const {getProduct}=require('../controllers/productController')
// const productValidator=require('../validators/index')
router.post("/products",postProduct)
router.get("/products",getProduct)
module.exports=router