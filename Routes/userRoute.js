const userRouter=require('express').Router()
const user=require('../API/user/userController')
const login=require("../API/login/login")
const product=require("../API/product/productController")
const contact=require('../API/Contact/enquiryController')
const cart=require("../API/cart/cartController")
const wishlist=require("../API/wishlist/wishlistController")
const category=require("../API/category/categoryController")
const proceed=require("../API/placing order/placeorderController")
            //user api
 
          
//add            
userRouter.post('/adduser',user.addUser)
//category wise
userRouter.post("/product/categorywise",product.categoryWiseProduct)
userRouter.post("/product/maxandmin",product.maxandmin)
//login
userRouter.post("/login",login.loginUser)
userRouter.post("/category/single",category.singleCategory)
userRouter.get("/product/all",product.allProduct)
userRouter.post("/product/searchall",product.searchall)

userRouter.post("/wishlist/all",wishlist.allwishlist)
//custom middlewares
userRouter.use(require("../API/custom-middlewares/CustomerTokenChecker"))

//product
userRouter.post("/product/single",product.singleProduct)
//wishlist
userRouter.post("/wishlist/add",wishlist.addToWishlist)
userRouter.post("/wishlist/remove",wishlist.removeWish)
//contact
userRouter.post("/contact/add",contact.addEnquiry)
userRouter.post("/contact/single",contact.singleEnquiry)
//user
userRouter.post("/user/single",user.SingleUser)
// cart
userRouter.post("/cart/add",cart.Addtocart)
userRouter.post("/cart/remove",cart.RemovefromCart)
userRouter.post("/cart/all",cart.allcart)
//proceeed to order
userRouter.post("/order/add",proceed.proceedToOrder)  

module.exports=userRouter