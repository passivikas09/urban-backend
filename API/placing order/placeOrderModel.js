const mongo=require('mongoose')
const ObjectId=mongo.Types.ObjectId
const placeorder=mongo.Schema({
    userId:{type:ObjectId,default:null,ref:"User"},
    products:[{
        productId:{type:ObjectId,default:null,ref:"Product"},
        price:{type:Number,default:0},
        quantity:{type:Number,default:0}
    }],
    OverallItems:{type:Number,default:0},
    TotalProducts:{type:Number,default:0},
    GrandTotal:{type:Number,default:0},
    orderStatus:{type:Number,default:1},  //1> Pending, 2>Confirmed, 3> Shipped, 4> Delivered  5> Cancelled
    shippingUrl:{type:String,default:""},
    trackingStatus:{type:String,default:""},
    createdAt:{type:Date,default:Date.now()},
    updateAt:{type:Date,default:null},
    isDeleted:{type:Boolean,default:false}
})
module.exports=mongo.model('placeorder',placeorder)