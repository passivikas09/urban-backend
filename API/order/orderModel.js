const mongo=require("mongoose")
const ObjectId=mongo.Types.ObjectId
const orderSchema=mongo.Schema({
    autoId:{type:Number,default:0},
    userId:{type:ObjectId,default:null,ref:"User"},
    productId:{type:ObjectId,default:null,ref:"Product"},
    productPrice:{type:Number,default:0},
    quantity:{type:Number,default:0},
    finalAmount:{type:Number,default:0},
    orderStatus:{type:Number,default:1},  //1> Pending, 2>Confirmed, 3> Shipped, 4> Delivered  5> Cancelled
    shippingUrl:{type:String,default:""},
    trackingStatus:{type:String,default:""},
    createdAt:{type:Date,default:Date.now()},
    updateAt:{type:Date,default:null}
})
module.exports=mongo.model("order",orderSchema)