const category = require('./categoryModel')

// add
async function addCategory(req, res) {
    let categoryObj = new category()
    let formData = req.body
    let { name} = formData
    let validations = []
    if (!name) {
        validations.push('name')
    }
    if (validations.length > 0) {
        res.send({
            success: true,
            status: 400,
            message: validations.join("+") + "required"
        })
    } else {
        let existingCategory = await category.findOne({ name: formData.name })
        if (!!existingCategory) {
            res.send({
                success: false,
                status: 400,
                message: "category already exits"
            })
        } else {
            let total = await category.countDocuments({isDeleted:false})
            if(!!req.file){
                console.log(req.file)
                categoryObj.image="/categoryImage/"+req.file.originalname 
            }
            categoryObj.name = formData.name
            categoryObj.autoId = total + 1
            categoryObj.save().then((item) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "Category  added successfully",
                    data: item
                })
            }).catch((err) => {
                res.send({
                    success: false,
                    status: 400,
                    message: "Error" + err
                })
            })
         }
    }
}

// all category

function allCategory(req,res){
    category.find({isDeleted:false}).then((item)=>{
        res.send({
            success: true,
            status: 200,
            message: "All Categories loaded Successfully",
            data: item
        })
    }).catch((err)=>{
        res.send({
            success:false,
            status:400,
            message: "Error"+err
        })
    })
}

//single category
function singleCategory(req,res){
       category.findOne({_id:req.body._id,isDeleted:false}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message: "Category Not Found"
            })  
        }else{
            res.send({
                success: true,
                status: 200,
                message: "All Category loaded Successfully",
                data: item
            })  
        }}).catch(err=>res.send({
        success: false,
        status: 500,
        message: "Error"+err
    }) ) 
}
//delete
function deleteCategory(req,res){
        category.deleteOne({_id:req.body._id}).then((item)=>{
            if(!item){
                res.send({
                    success:false,
                    status:404,
                    message: "Category Not Found"
                })  
            }else{
                res.send({
                    success: true,
                    status: 200,
                    message: "All Category loaded Successfully",
                    data: item
                })} 
        }).catch((err)=>{
            res.send({
                success: false,
                status: 400,
                message: "Error"+err
            }) 
        })       
}

// soft deleted
function softDeleted(req,res){
    let formData=req.body
    category.findOne({_id:formData._id,isDeleted:false}).then((categoryObj)=>{
        if(categoryObj==null){
            res.send({
                success:false,
                status:404,
                message:'category not found'
            })
        }else{
            categoryObj.isDeleted=true
            categoryObj.save().then((item)=>{
                res.send({
                    success:true,
                    status:200,
                    message:"Category deleted",
                    data:item
                })  
            }).catch((err)=>{
                res.send({
                    success:false,
                    status:400,
                    message:"error"+err
              })   
            })
        }
    }).catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:"error"+err
      })  
    })
}

//update
function updateCategory(req,res){
    let formData=req.body
       category.findOne({_id:formData._id}).then((item)=>{
            if(!item){
                res.send({
                    success:false,
                    status:404,
                    message:"Error"+err
                })
            }else{
                if(!!formData.name) item.name=formData.name
                if(!!formData.image)item.image=formData.image
                item.save().then((result)=>{
                        res.send({
                            success:true,
                            status:200,
                            message:"Updated",
                            data:result
                        })
                }).catch((err)=>{
                        res.send({
                            success:false,
                            status:400,
                            message:"Errror"+err
                        })
                }) 
            }
       }).catch((err)=>{
                res.send({
                    success:false,
                    status:500,
                    message:"Errror"+err
                })    
       }) 
}
module.exports = { softDeleted, addCategory ,allCategory,singleCategory,deleteCategory ,updateCategory}