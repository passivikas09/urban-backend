const cart=require("./cartModel")
const product=require("../product/productModel")
async function Addtocart(req,res){
    let formdata=req.body
    let validations=[]
    let{userId,userDemand,productId}=formdata
    if(!userDemand){
        validations.push("quantity")
    }
    if(!userId){
        validations.push("userId")
    }
    if(!productId){
        validations.push("ProductId")
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join("+")+"required"
        })
    }else{
        let existingCart= await cart.findOne({userId:formdata.userId})
        if(!!existingCart){
            let productData= await product.findOne({_id:formdata.productId})
            console.log(productData)
            if(!productData){
                res.send({
                    success:false,
                    status:404,
                    message:"product Doesn't exists"
                })
            }else{
                existingCart.products.push({
                    productId:formdata.productId,
                    price:productData.price,
                    quantity:formdata.userDemand,
                    name:productData.name
                })
                existingCart.TotalProducts=existingCart.products.length
                existingCart.GrandTotal+=productData.price*formdata.userDemand
                existingCart.OverallItems=parseInt(existingCart.OverallItems)+parseInt(formdata.userDemand)
                existingCart.save().then((result)=>{
                    res.send({
                        success:true,
                        status:200,
                        message:"Add to cart",
                        data:result
                    })
                }).catch((err)=>{
                    res.send({
                        success:false,
                        status:400,
                        message:"Error"+err
                    })
                })
            }
        }else{
            let cartObj= new cart()
            let productData= await product.findOne({_id:formdata.productId})
            if(formdata.userDemand>productData.quantity){
                res.send({
                    success:false,
                    status:400,
                    message:"product is out stock"
                })
            }else{
            cartObj.userId=formdata.userId
            cartObj.products.push({
                productId:formdata.productId,
                price:productData.price,
                quantity:formdata.userDemand,
                name:productData.name
            })    
            cartObj.GrandTotal+=productData.price*formdata.userDemand
            cartObj.TotalProducts=cartObj.products.length
            cartObj.OverallItems=parseInt(formdata.userDemand)
            productData.quantity-=parseInt(formdata.userDemand)
            cartObj.save().then((item)=>{
                res.send({
                    success:true,
                    status:200,
                    message:"add to cart",
                    data:item
                })
            }).catch((err)=>{
                res.send({
                    success:false,
                    status:400,
                    message:"error"+err
                })    
            })
        }}

    }
}

async function allcart(req,res){
    let formData=req.body
    let userCart= await cart.findOne({userId:formData._id})
    if(!userCart){
        res.send({
            success:false,
            status:404,
            message:"cart not found"
        })
    }else{
        res.send({
            success:true,
            status:200,
            message:"loaded",
            data:userCart   
        })
    }
}


async function RemovefromCart(req,res){
    let formData=req.body
    let existingCart= await cart.findOne({userId:formData.userId})
    if(!existingCart){
        res.send({
            success:false,
            status:404,
            message:"cart not found"
        })
    }else{
       let index= existingCart.products.findIndex((x)=>x.productId.toString()==formData.productId.toString())
        let productData = await product.findOne({_id:formData.productId})
       if(index==-1){
            res.send({
                success:false,
                status:404,
                message:"product not Found"
            })
       }else{
            existingCart.products.splice(index,1)
            existingCart.save().then((item)=>{
                resetcart(item,productData)
                res.send({
                    success:true,
                    status:200,
                    message:"Deleted succesfully",
                    data:item
                })
            }).catch((err)=>{
                res.send({
                    success:false,
                    status:404,
                    message:"Error:"+err
                })
            })
       }   
    }   
function resetcart(item,productData){
    item.GrandTotal-=productData.price
    item.save().then((result)=>{
        console.log("result:"+result)
    })
}   
}


module.exports={Addtocart ,RemovefromCart,allcart}