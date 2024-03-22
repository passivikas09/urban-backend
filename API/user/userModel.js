const mongo=require('mongoose')
const userSchema=mongo.Schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:""},
    email:{type:String,default:""},
    password:{type:String,default:""},
    mobile:{type:Number,default:0},
    address:{type:String,default:''},
    isdeleted:{type:Boolean,default:false},
    userType:{type:Number,default:2},
    createdAt:{type:Date,default:Date.now()}
})

module.exports=mongo.model("User",userSchema)