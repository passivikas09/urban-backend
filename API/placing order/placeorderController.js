const cartModel=require('../cart/cartModel')
const placeOrderModel = require('./placeOrderModel')

async function proceedToOrder(req,res){
    let formData=req.body
    let validations=[]
    let {userId}=formData
    if(!userId){
        validations.push("userID")
    }
    if(validations.length>0){
        res.send({
            message:validations.join("+"+'required')
        })
    }else{
        let cart= await cartModel.findOne({userId:formData.userId})
        if(!cart){
            res.send({
                success:false,
                status:404,
                message:"Cart is empty"
            })
        }else{
            let orderlist= new placeOrderModel() 
            orderlist.products=cart.products
            orderlist.userId=cart.userId 
            orderlist.OverallItems=cart.OverallItems
            orderlist.TotalProducts=cart.TotalProducts
            orderlist.GrandTotal=cart.GrandTotal
            orderlist.save().then((item)=>{
                console.log("orderlist===>"+item)
                 resetcart(cart)
                res.send({
                    success:true,
                    status:200,
                    message:"Order Placed",
                    data:item
                })  
            }).catch((err)=>{
                res.send({
                    success:false,
                    status:400,
                    message:"Error"+err
                })
            })
        }
    }
}

function resetcart(cart){ 
    cart.OverallItems=0
    cart.TotalProducts=0
    cart.GrandTotal=0
    cart.products=[]
    cart.save().then((item)=>{
        console.log("reset cart===>"+item)
    }).catch((err)=>{
        console.log("error"+err)
    })
}

function orderAll(req,res){
    placeOrderModel.find().populate("userId").populate("products.productId").then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"order doesn't found"
            })
        }else{
            res.send({
                success:true,
                status:200,
                message:"loaded successfully",
                data:item
            })
        }
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"Error:"+err
        })
    })
}
module.exports={proceedToOrder,orderAll}