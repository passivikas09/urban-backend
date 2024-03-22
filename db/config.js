const mongo=require('mongoose')

mongo.connect("mongodb+srv://passivikas09:vikaspassi09@cluster1.3izkr7k.mongodb.net/E-commerce ").then(()=>{
    console.log("Database is running")
}).catch(err=>console.log(err))