const order=require('./orderModel')
const product=require('../product/productModel')

//add
async function OrderAdd(req,res){
    let orderObj=new order()
    let formData=req.body
    let validations=[]
    let {userId,productId,quantity}=formData
    if(!userId){
        validations.push("userId")
    }
    if(!productId){
        validations.push("productId")
    }
    if(!quantity){
        validations.push("quantity")
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join("+")+"required"
        })
    }else{
        let productData= await product.findById(productId)
        if(!productData){
            res.send({
                success:false,
                status:404,
                message:"product doesnot Found"
            })  
        }else{
            if(quantity>productData.quantity){
                res.send({
                    success:false,
                    status:400,
                    message:"Out of Stock"
                })  
            }else{
                let total=await order.countDocuments()
                orderObj.autoId=total+1
                orderObj.productId=productId
                orderObj.userId=userId
                orderObj.productPrice=productData.price
                orderObj.quantity=quantity
                orderObj.finalAmount=productData.price*quantity
                productData.quantity-=quantity
                orderObj.save().then((result)=>{
                    res.send({
                        success:true,
                        status:200,
                        message:'order added successfully',
                        data:result
                    })
                }).catch((err)=>{
                    res.send({
                        success:false,
                        status:400,
                        message:'Error'+err
                    })
                })
            }
         }
    }
}

//all
function orderAll(req,res){
    let formData=req.body
    let limit=100000
    let startpoint=0
    if(formData.startpoint!=undefined){
        formData.startpoint=startpoint
        formData.limit=limit
    }
    order.find().then((item)=>{
        res.send({
            success:true,
            status:200,
            message:"loaded successfully",
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

//single order

function orderSingle(req,res){
    order.findOne({_id:req.body._id}).then((item)=>{
        res.send({
            success:false,
            status:400,
            message:"Loaded Successfully",
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

//category wise orders
function categoryWiseOrders(res,res){
    order.findOne({categoryId:req.body.categoryId}).populate("categoryId","name").
    sort({name:1,createdAt:-1}).
    limit(5).then((orderlist)=>{
        res.send({
            success:true,
            status:200,
            message:"Loaded Successfully",
            data:orderlist
        })
    }).catch((err)=>{
        res.send({
            success:false,
            status:400,
            message:"Error"+err
        })
    })
}
//disable all
function disableAll(req,res){
    order.updateMany({isActive:true},{isActive:false}).then((orderlist)=>{
        res.send({
            success:false,
            status:400,
            message:"Updated/disable successfully",
            data:orderlist
        })
    }).catch((err)=>{
        res.send({
            success:false,
            status:400,
            message:"Error"+err
        })
    })
}

//update

function updateOrder(req, res) {
    let formData = req.body
    order.findOne({ _id: formData._id }).then(OrderObj => {
      if (OrderObj == null) {
        res.send({
          success: false,
          status: 404,
          message: "Order not found"
        })
      }
      else {
        if (!!formData.name) OrderObj.name = formData.name
        if (!!formData.price) OrderObj.price = formData.price
        if (!!formData.quantity) OrderObj.quantity = formData.quantity
        if (!!formData.categoryId) OrderObj.categoryId = formData.categoryId
        OrderObj.save().then(updateRes => {
          res.send({
            success: true,
            status: 200,
            message: "Updated",
            data: updateRes
          })
        }).catch(err => {
          res.send({
            success: false,
            status: 500,
            message: "Err: " + err
          })
        })
  
      }
  
    }).catch(err => {
      res.send({
        success: false,
        status: 500,
        message: "Err: " + err
      })
    })
  }

module.exports={OrderAdd,orderAll,orderSingle, categoryWiseOrders,disableAll,updateOrder}