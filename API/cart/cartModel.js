const mongo=require('mongoose')
const ObjectID=mongo.Types.ObjectId
const cartSchema=mongo.Schema({
    userId:{type:ObjectID,default:null},
    products:[{
        productId:{type:ObjectID,default:null,ref:"category"},
        quantity:{type:Number,default:1},
        price:{type:Number,default:0},
        name:{type:String,default:""}
    }],
    OverallItems:{type:Number,default:0},
    TotalProducts:{type:Number,default:0},
    GrandTotal:{type:Number,default:0},
    CreatedAt:{type:Date,default:Date.now()}
})
module.exports=mongo.model("Cart",cartSchema)