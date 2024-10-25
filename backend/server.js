import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'

//app config
const app = express()
const port = process.env.PORT || 4000 // use port no 4000 if others are used

connectDB() //export database
connectCloudinary() 

//mmiddleware
app.use(express.json()) //whatever request is received will be passed througn json
app.use(cors())

//api endpoint
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

//api endpoints
app.get('/',(req,res)=>{
    res.send("API Working")
})

//start the express server
app.listen(port,()=> console.log('Server started on port : ' +port))