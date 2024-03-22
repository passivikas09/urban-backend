const user=require("../API/user/userModel")

async function createAdmin(){
    let userObj=new user({
        name:"admin123",
        email:"Ecom@admin.com",
        password:"$2b$10$2uem3mUTF2lKgGDc3lsW1.zVlHG/KEKDv5JG5LOwQuLH3Koe2NsOC",//123
        mobile:8427324707,
        userType:1,
        address:"dashmesh nagar"
    })
    let existingadmin= await user.findOne({email:userObj.email})
    if(!!existingadmin){
        console.log("admin already exists")
    }else{
        userObj.save().then((item)=>{
            console.log(item)
            console.log('admin has been created')
        }).catch((err)=>{
            console.log("error"+err)
        })
    }
}

module.exports={createAdmin}