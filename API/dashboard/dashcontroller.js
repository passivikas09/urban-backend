const user=require("../user/userModel")
const product=require("../product/productModel")
const category=require("../category/categoryModel")
const subcategory=require('../subcategory/subcategoryModel')
const Enquiry=require("../Contact/contactModel")
const order=require("../placing order/placeOrderModel") 

async function dashboardApi(req,res){
    let DashboardObj={}
    let Totaluser=await user.countDocuments()
    let TotalCategory= await category.countDocuments()
    let TotalProduct= await product.countDocuments()
    let TotalSubcategory= await subcategory.countDocuments()
    let TotalEnquiry= await Enquiry.countDocuments()
    let TotalOrder= await order.countDocuments()
    DashboardObj.TotalUser= Totaluser
    DashboardObj.TotalCategory=TotalCategory
    DashboardObj.TotalSubcategory=TotalSubcategory
    DashboardObj.TotalProduct=TotalProduct
    DashboardObj.TotalEnquiry=TotalEnquiry
    DashboardObj.TotalOrder=TotalOrder
    order.find().populate("userId").populate("products.productId").sort({createdAt:-1}).limit(5).then((item)=>{
            DashboardObj.RecentOrders=item
        res.send({
            success:true,
            status:200,
            message:"loaded",
            data:DashboardObj
        })
    }).catch((err)=>{
        res.send({
            success:false,
            status:400,
            message:"Errro"+err
        })
    })
}
module.exports={dashboardApi}
