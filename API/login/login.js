const user=require("../user/userModel")
const bcrypt=require("bcrypt")
const { config } = require("dotenv")
const jwt=require('jsonwebtoken')
require("dotenv").config()
function loginUser(req,res){
    let formData=req.body
    let {password,email}=formData
    let validation=[]
    if(!email){
        validation.push("email")
    }
    if(!password){
        validation.push("password")
    }
    if(validation.length>0){
        res.send({
            success:false,
            status:400,
            message:validation.join("+")+"required"
        })
    }else{
           user.findOne({email:formData.email}).then((result)=>{
            let hashed=bcrypt.compareSync(formData.password,result.password)  
            let payload={_id:result._id,name:result.name,userType:result.userType}
            let token =jwt.sign(payload,process.env.SECRETKEY)   
            if(!!hashed){
                        res.send({
                            success:true,
                            status:200,
                            message:"Login Successfully",
                            token:token,
                            data:result
                        })
                   }else{
                        res.send({
                            success:false,
                            status:400,
                            message:"Invalid Credentials"
                        })
                   } 
           }).catch((err)=>{
                        res.send({
                            success:false,
                            status:400,
                            message:"user doesnot exist"+err
                        })
           })
    }       
}

module.exports={loginUser}