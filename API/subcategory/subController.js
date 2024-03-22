const subcategory = require("./subcategoryModel")

async function addSubcategory(req, res) {
    let subObj = new subcategory()
    let formData = req.body
    let { name, categoryId } = formData
    let validations = []
    if (!name) {
        validations.push("name")
    }
    if (!categoryId) {
        validations.push("category")
    }
    if (validations.length > 0) {
        res.send({
            success: false,
            status: 400,
            message: validations.join("+")+"  " + "required"
        })
    } else {
        let existingSubcategory = await subcategory.findOne({ name: formData.name })
        if (!!existingSubcategory) {
            res.send({
                success: false,
                status: 400,
                message: "Subcategory already exits"
            })
        }
        else {
            let total = await subcategory.countDocuments({isdeleted:false})
            if(!!req.file){
                console.log(req.file)
                subObj.image="/subcategoryImages/"+req.file.originalname
            }
            subObj.autoId = total + 1
            subObj.name = formData.name
            subObj.categoryId=formData.categoryId
            subObj.save().then((item) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "SubCategory added successfully",
                    data: item
                })
            }).catch((err) => {
                res.send({
                    success: false,
                    status: 400,
                    message: "Error"+err,
                    data: item
                })
            })
        }
    }
}

function allSubcategory(req,res){
    subcategory.find({isdeleted:false}).then((item)=>{
        res.send({
            success:true,
            status: 200,
            message: "SubCategory loaded successfully",
            data: item
        })
    }).catch((err)=>{
        res.send({
            success: false,
            status: 400,
            message: "Error"+err,
        }) 
    })
}
//single Subcategory
function singleSubcategory(req,res){
    subcategory.findOne({_id:req.body._id,isdeleted:false}).then((item)=>{
         res.send({
             success: true,
             status: 200,
             message: "Subcategory loaded Successfully",
             data: item
         })             
    }).catch(err=>res.send({
     success: false,
     status: 404,
     message: "Error"+err
 }) ) 
}

//  delete Subcategory
function deleteSubcategory(req,res){
    let formData=req.body
    subcategory.findOne({_id:formData._id,isdeleted:false}).then((subcategoryObj)=>{
        if(subcategoryObj==null){
            res.send({
                success:false,
                status:404,
                message:'category not found'
            })
        }else{
            subcategoryObj.isdeleted=true
            subcategoryObj.save().then(()=>{
                res.send({
                    success:true,
                    status:200,
                    message:"Category deleted"
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
function updateSubCategory(req,res){
    let formData=req.body
        subcategory.findOne({_id:formData._id}).then((item)=>{
            if(!item){
                res.send({
                    success:false,
                    status:404,
                    message:"subcategory not found"
                })
            }else{
                if(!!formData.name) item.name=formData.name
                if(!!formData.image) item.image=formData.image
                item.save().then((result)=>{
                    res.send({
                        success:true,
                        status:200,
                        message:"updated",
                        data:result
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



module.exports = { addSubcategory , allSubcategory , singleSubcategory ,deleteSubcategory,updateSubCategory}