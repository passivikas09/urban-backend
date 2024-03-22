
const product=require('./productModel')

//add
async function addProduct(req,res){
    let formData=req.body
    let {name,price,quantity,categoryId,subcategoryId}=formData
    let validations=[]
    if(!name){
        validations.push('name')}
    if(!price){
        validations.push('price')
    }
    if(!quantity){
        validations.push("quantity")
    }
    if(!categoryId){
        validations.push('categoryId')
    }
    if(!subcategoryId){
        validations.push('subcategoryId')
    }
    console.log("validations")
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join("+")+"required"
        })
    }else{
        console.log("else one")
        let existingProduct=await product.findOne({name:formData.name})
        if(!!existingProduct){
            res.send({
                success:false,
                status:400,
                message:"Product already exists"
            })
        }else{
            console.log('working')
               let total= await product.countDocuments()
               let productObj=new product()
               if(!!req.file){
                    console.log(req.file)
                    productObj.image="/product/"+req.file.filename
               }
               productObj.name=formData.name
               productObj.autoId=total+1
               productObj.tag=formData.tag
               productObj.categoryId=formData.categoryId
               productObj.subcategoryId=formData.subcategoryId
               productObj.price=formData.price
               productObj.quantity=formData.quantity
               productObj.save().then((item)=>{
                        res.send({
                            success:true,
                            status:200,
                            message:"Product added successfully",
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


function allProduct(req,res){
    product.find({isdeleted:false}).populate('categoryId').then((item)=>{  
        if(item==null){ 
            res.send({
                success:false,
                status:404,
                message:"Error"
            })  
        }else{ 
        res.send({
           success:true,
           status:200,
           message:"all products loaded",
           data:item
        })}
    }).catch((err)=>{
        res.send({
            success:false,
            status:400,
            message:"Error"+err
         })
    })
}

//single
function singleProduct(req,res){
    product.findOne({_id:req.body._id}).populate("categoryId").then((item)=>{
        if(!item){ 
            res.send({
                success:false,
                status:404,
                message:"Product not Found"
            })
        }else{    
            res.send({
                success:true,
                status:200,
                message:"all products loaded",
                data:item
            })
        }
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"Error"+err
         })
    })
}

function DeleteProduct(req,res){
 product.findOne({_id:req.body._id}).then((result)=>{
    if(!result){
        res.send({
            success:false,
            status:404,
            message:"Product not Found"
        })
    }else{
        result.isdeleted=true
        result.save().then((item)=>{
            res.send({
                success:true,
                status:200,
                message:"Deleted Successfully",
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
 }).catch((err)=>{
    res.send({
        success:false,
        status:500,
        message:"Error"+err
     }) 
 })
}

function updateProduct(req,res){
    product.findOne({_id:req.body._id,isdeleted:false}).then((result)=>{
        if(!!req.body.name) result.name=req.body.name 
        if(!!req.body.image) result.image=req.body.image 
        if(!!req.body.price) result.price=req.body.price 
        if(!!req.body.quantity) result.quantity=req.body.quantity
        result.save().then((item)=>{
            res.send({
                success:true,
                status:200,
                message:"Product Updated successfully",
                data:item
             })
        }).catch((err)=>{
            res.send({
                success:false,
                status:400,
                message:"Error"+err    
             })
        })
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"Error"+err
         }) 
    })
}

// category wise product 

function categoryWiseProduct(req,res){
    product.find({categoryId:req.body.categoryId}).populate("categoryId").then((item)=>{
        res.send({
            success:true,
            status:200,
            message:"loaded",
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

//max and min
function maxandmin(req,res){
    let min=req.body.min
    let max=req.body.max
    let query={$and:[{price:{$lte:max}},{price:{$gte:min}}]} 
    console.log(query)
    product.find(query).then((item)=>{
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

async function searchall(req,res){
    let x=req.body.name
    let query={name:{$all:[x]}}
    let item= await product.find(query)
    if(!item){
        res.send({
            success:false,
            status:404,
            message:"Prodcut doesn't exist"
        })
    }else{
         res.send({
            success:true,
            status:200,
            message:"loaded successfully",
            data:item       
         })   
    }
}

module.exports={addProduct,allProduct,DeleteProduct,searchall ,maxandmin,updateProduct,singleProduct,categoryWiseProduct}