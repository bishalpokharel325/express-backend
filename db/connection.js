const mongoose=require('mongoose')

exports.connector=mongoose.connect(process.env.DATABASE,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Database connected")
})