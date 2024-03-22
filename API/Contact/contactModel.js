const mongo=require("mongoose")
const contactSchema=mongo.Schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:""},
    email:{type:String,default:""},
    message:{type:String,default:""},
    reply:{type:String,default:""},
    isdeleted:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=mongo.model("enquiry",contactSchema)