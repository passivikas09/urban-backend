const express =require("express")
const app= express()
require("dotenv").config()
const port=process.env.PORT ||5000
const userRouter=require('./Routes/userRoute')
const adminRouter=require("./Routes/adminRoute")
const admin=require("./db/seed")

require("./db/config")

app.use(express.static(__dirname+"/public/"))
const cors=require("cors")
app.use(cors({
    origin:"https://urban-front-vercel.app",
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type', 'Authorization']
}))
app.use(express.urlencoded())
app.use(express.json())

app.use("/api",userRouter)

app.use("/admin",adminRouter)
admin.createAdmin() 

app.listen(port,()=>{
    console.log(`The server is running at port ${port}`)
})

