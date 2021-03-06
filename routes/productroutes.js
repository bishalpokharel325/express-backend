const router=require('express').Router()
const {postProduct}=require('../controllers/productController')
const {getProduct}=require('../controllers/productController')
const upload = require('../fileupload')
// const productValidator=require('../validators/index')
router.post("/products",upload.single("image"),postProduct)
router.get("/products",getProduct)
module.exports=router