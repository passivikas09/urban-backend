const jwt=require("jsonwebtoken")
require("dotenv").config()
module.exports=(req,res,next)=>{
    let token=req.headers["authorization"]
    if(!token){
        res.send({
            success:false,
            status:404,
            message:"Token not found"
        })        
    }else{
           let decode=jwt.verify(token,process.env.SECRETKEY)
           try{
               if(!decode){
                res.send({
                    success:false,
                    status:401,
                    message:"token is not valid"
                })      
               } else{
                    if(decode.userType!=2){
                        res.send({
                            success:false,
                            status:403,
                            message:"unAuthorised access"
                        })
                    }else{
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


