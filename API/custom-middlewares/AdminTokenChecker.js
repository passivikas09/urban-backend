const jwt=require('jsonwebtoken')
require("dotenv").config()
module.exports=(req,res,next)=>{
   let token =req.headers["authorization"]
   if(!token){
        res.send({
            success:false,
            status:404,
            message:"token is required"
        })
   }else{
        try{
            let decode=jwt.verify(token,process.env.SECRETKEY)
            if(!decode){
                res.send({
                    success:false,
                    status:401,
                    message:"Invalid token"
                })      
            }else{
                if(decode.userType!=1){
                    res.send({
                        success:false,
                        status:401,
                        message:"unAuthorised access"
                    })  
                } else{
                    next()
                }   
            }
        }catch(err){
            res.send({
                success:false,
                status:500,
                message:"Error"+err
            })
        }
   }
}