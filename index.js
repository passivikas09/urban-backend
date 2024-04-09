const express =require("express")
const app= express()
require("dotenv").config()
const port=process.env.PORT ||5000
const userRouter=require('./Routes/userRoute')
const adminRouter=require("./Routes/adminRoute")
const admin=require("./db/seed")

require("./db/config")
app.use(express.static("public", { 
    setHeaders: (res, path, stat) => {
        // Set the Access-Control-Allow-Origin header to allow requests from the specified domain
        res.set("Access-Control-Allow-Origin", "https://sangria-centipede-ring.cyclic.app");
    }
}));

const cors=require("cors")
app.use(cors({
    origin:"https://urban-front.vercel.app",
    methods:['GET','POST','PUT','DELETE'],
    
}))
app.use(express.urlencoded())
app.use(express.json())

app.use("/api",userRouter)

app.use("/admin",adminRouter)
admin.createAdmin() 

app.listen(port,()=>{
    console.log(`The server is running at port ${port}`)
})

