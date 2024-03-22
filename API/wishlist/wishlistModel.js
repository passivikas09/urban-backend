const mongo=require('mongoose')
const ObjectId=mongo.Types.ObjectId
const wishlistSchema=mongo.Schema({
    userId:{type:ObjectId,default:null},
    products:[{ productId:{type:ObjectId,default:null,ref:"Product"}}] 
})
module.exports=mongo.model("wishlist",wishlistSchema)
