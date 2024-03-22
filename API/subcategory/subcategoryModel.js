const mongo=require("mongoose")
const ObjectId=mongo.Types.ObjectId
const subcategorySchema=mongo.Schema({
        autoId:{type:Number,default:0},
        name:{type:String,default:""},
        categoryId:{type:ObjectId,default:null,ref:"category"},
        image:{type:String,default:""},
        isdeleted:{type:Boolean,default:false},
        createdAt:{type:Date,default:Date.now()}
})
module.exports=mongo.model("subcategory",subcategorySchema)