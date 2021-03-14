const express=require('express');
const { postOrderItem, postOrder } = require("../controllers/orderController");
const { requireSignin } = require("../controllers/userController");
const router=express.Router()
router.post("/orderitems",requireSignin,postOrderItem)
router.post("/orders",requireSignin,postOrder)
module.exports=router