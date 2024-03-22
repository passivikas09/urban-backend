const mongo=require('mongoose')
const categorySchema=mongo.Schema({
    name:{type:String,default:""},
    image:{type:String ,default:""},
    autoId:{type:Number,default:0},
    isDeleted:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now()}
})
module.exports=mongo.model("category",categorySchema)