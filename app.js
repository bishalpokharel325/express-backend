// importing dependencies and initializing app
const mongoose=require('mongoose')
const express=require('express')
require('dotenv').config()
const bodyParser=require('body-parser')
const morgan=require('morgan')
const cors=require('cors')
const connector=require('./db/connection')
const categoryRoute=require("./routes/categoryroutes")
const productRoute=require('./routes/productroutes')
const userRoute=require('./routes/userroute')
const orderRoute=require('./routes/orderroutes')
const validator=require('express-validator')
const cookieParser=require('cookie-parser')
const multer=require('multer')
const app=express()

connector.connector

//middlewares
app.use(bodyParser.json())
app.use("/public/uploads",express.static('public/uploads'));
app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())
// app.use(validator())
app.use("/api",categoryRoute)
app.use("/api",productRoute)
app.use("/api",userRoute)
app.use("/api",orderRoute)

//initialize port and run server
const port=process.env.PORT
app.listen(port,
    ()=>{
        console.log(`Server running on ${port} port`)
    })
