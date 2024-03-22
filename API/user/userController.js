const user=require('./userModel')
const bcrypt=require('bcrypt')
const salt=10
// add user
async function addUser(req,res){
     let userObj=new user()
     let total= await user.countDocuments({isdeleted:false})
     let formData=req.body
      userObj.autoId=total+1  
      userObj.name=formData.name
      userObj.email=formData.email
      let encryptPwd=bcrypt.hashSync(formData.password,salt)
      userObj.mobile=formData.mobile
      userObj.address=formData.address
      userObj.password=encryptPwd
      userObj.save().then((data)=>{
            res.send({
                success:true,
                status:200,
                message:"Registration Successful",
                data:data
            })
      }).catch((err)=>{
            res.send({
                success:false,
                status:400,
                message:"Error"+err
            })
      })   
}

// all user

function allUser(req,res){
    user.find({isdeleted:false}).then((item)=>{
        res.send({
            success:true,
            status:200,
            message:"All users loaded successfully",
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

// single user
function SingleUser(req,res){
    user.findOne({_id:req.body._id}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"users not Found"
            })
        }else{
            res.send({
                success:true,
                status:200,
                message:"users loaded successfully",
                data:item
            })
        }
    }).catch((err)=>{
        res.send({
            success:false,
            status:400,
            message:"Error"+err
        })    
    })
}

// delete user
function deleteUser(req,res){
    user.findOne({_id:req.body._id,isdeleted:false}).then((item)=>{
        if(!item){
            res.send({
                success:false,
                status:404,
                message:"User not found"
            })    
        }  else{ 
            item.isdeleted=true
            item.save().then((item)=>{
                res.send({
                    success:true,
                    status:200,
                    message:"User deleted Successfully",
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

// update
    function updateUser(){
        user.findOne({_id:req.body._id}).then((item)=>{
            if(!item){
                res.send({     
                    success:false,
                    status:404,
                    message:"User not found"
                })
            }else{
                if(!!req.body.name)item.name=req.body.name
                if(!!req.body.email)item.email=req.body.email
                if(!!req.body.password)item.password=req.body.password
                if(!!req.body.mobile)item.mobile=req.body.mobile
                if(!!req.body.address)item.address=req.body.address
                item.save().then((result)=>{
                    res.send({     
                        success:true,
                        status:200,
                        message:"Updated Successfully",
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
        }).catch((err)=>{
            res.send({     
                success:false,
                status:500,
                message:"Error"+err
            })   
        })
    }


module.exports={addUser ,allUser , deleteUser ,SingleUser ,updateUser}