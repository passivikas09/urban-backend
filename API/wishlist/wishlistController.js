const wishlist=require('./wishlistModel')
const product=require("../product/productModel")

//add
async function addToWishlist(req,res){
    let formdata=req.body
    let validations=[]
    let{productId,userId}=formdata
    if(!userId){
        validations.push("userid")
    }
    if(!productId){
        validations.push("productID")
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join("+")+"required"
        })
    }else{
        let existingWishlist= await wishlist.findOne({userId:formdata.userId})
        if(!!existingWishlist){
            let productData= await product.findOne({_id:formdata.productId})
            if(!productData){
                res.send({
                    success:false,
                    status:404,
                    message:"product doesn't exits"
                })  
            }else{
                existingWishlist.products.push({
                    productId:formdata.productId
               })   
            }
            existingWishlist.save().then((item)=>{
                res.send({
                    success:true,
                    status:200,
                    message:"Add to wishlist",
                    data:item
                })
            }).catch((err)=>{
                res.send({
                    success:false,
                    status:400,
                    message:"Error"+err
                })
            })
        }else{
            let wishlistObj= new wishlist()
            let productData = await product.findOne({_id:formdata.productId})
            if(!productData){
                res.send({
                    success:false,
                    status:404,
                    message:"Product not found"
                })
            }else{
                wishlistObj.userId=formdata.userId
                wishlistObj.products.push({
                    productId:formdata.productId
                })
                wishlistObj.save().then((item)=>{
                    res.send({
                        success:true,
                        status:200,
                        message:"Add to wishlist",
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
}

//all
function allwishlist(req,res){
    wishlist.find({userId:req.body.userId}).populate("products.productId").then((item)=>{
        res.send({
            success:true,
            status:200,
            message:"wishlist  Load ",
            data:item
        })
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"Error"+err
        }) 
    })
}

//delete

function removeWish(req,res){
    let formdata=req.body
    wishlist.findOne({userId:formdata.userId}).then((wishlistObj)=>{
        if(!wishlistObj)
        {
            res.send({
                success:false,
                status:400,
                message:"No wishlist found"
            }) 
        }else{
            let index=  wishlistObj.products.findIndex(x=> x.productId.toString() == formdata.productId.toString())
            console.log(wishlistObj)
            if(index==-1)
            {
                res.send({
                    success:false,
                    status:400,
                    message:"No product found in wishllist"
                }) 
            }else{
                wishlist.products.splice(index,1)
                wishlist.save().then(r=>{
                    res.send({
                        success:true,
                        status:200,
                        message:"Product successfully removed from the wishlist",
                        data:r
                    }) 
                }).catch(err=>{
                    res.send({
                        success:false,
                        status:500,
                        message:"Error: "+ err
                    }) 
                })
            }
        }
    })        
}

module.exports={addToWishlist, allwishlist,removeWish}