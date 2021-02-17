exports.productvalidation=(req,res,next)=>{
    req.check('title','product name is required').notEmpty().isLength({
        min:10,
        max:200,
    })
    req.check('price','Price is required').notEmpty().withMessage("price must be a number")
    
    const errors=req.validationErrors()
    if(errors){
        const anyError=errors.map((error)=>{
           return error.msg
        })
        return res.status(400).json({anyError})
    }
    next()
}