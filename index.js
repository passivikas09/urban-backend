const express =require("express")
require("dotenv").config()
const app= express()
const port=process.env.PORT|| 4000
const userRouter=require('./Routes/userRoute')
const adminRouter=require("./Routes/adminRoute")
const admin=require("./db/seed")
const cors=require('cors')
require("./db/config")
app.use(express.static(__dirname+"/public/"))
app.use(cors({
    origin:"https://urban-front.vercel.app",
    methods:['GET', 'POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.urlencoded())
app.use(express.json())

app.use("/api",userRouter)

app.use("/admin",adminRouter)
admin.createAdmin() 

app.listen(port,()=>{
    console.log(`The server is running at port ${port}`)
})