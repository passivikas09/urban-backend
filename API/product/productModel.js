const mongo=require("mongoose")
const ObjectId=mongo.Types.ObjectId
const productSchema=mongo.Schema({
        autoId:{type:Number,default:0},
        categoryId:{type:ObjectId,default:null,ref:"category"},
        subcategoryId:{type:ObjectId,default:null,ref:"subcategory"},
        name:{type:String,default:""},
        price:{type:Number,default:0},
        quantity:{type:Number,default:0},
        tags:{type:String,default:""},
        // expiryDate:{type:Date,default:null},
        isdeleted:{type:Boolean,default:false},
        image:{type:String,default:""},
        createdAt:{type:Date,default:Date.now()}
})
module.exports=mongo.model("Product",productSchema)