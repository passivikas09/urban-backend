const mongo=require('mongoose')
require("dotenv").config()
mongo.connect(process.env.SERVER).then(()=>{
    console.log("Database is running")
}).catch(err=>console.log(err))