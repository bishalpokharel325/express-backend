const orderItemModel=require('../models/orderItem')
const orderModel=require('../models/orderModel')
exports.postOrderItem=(req,res)=>{
    const new_orderitem=orderItemModel(req.body)
    .save()
    .then((data)=>{
        return res.json({message:data})
    })
}
exports.postOrder= async (req,res)=>{
  const orderitem = req.body.orderItems
  const totalPrices = await Promise.all(orderitem.map(async(orderItemId) =>{
    const orderItem = await  orderItemModel.findById(orderItemId).populate('productId','price');
    const totalPrice = orderItem.productId.price*orderItem.quantity;
    return(totalPrice)
  }))
  
      const totalPrice = totalPrices.reduce((a,b) => a+b,0)
   
    let order = new orderModel({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        city: req.body.city,
        country: req.body.country,
        phoneno: req.body.phoneno,
        status: req.body.status,
        total:totalPrice + (req.body.shipping_fee),
        shipping_fee:req.body.shipping_fee,
        userId: req.auth._id,  //directly userid pass garne 
    })
     await order.save((error,order)=>{
     	if(!order)
    return res.status(400).json({error:error})

    res.json({order});
     });   
}
