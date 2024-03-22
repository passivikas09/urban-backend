const adminRouter = require("express").Router()
const multer = require("multer")
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/categoryImages')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname)
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })


const subcategorystorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/subcategoryImages')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname)
    cb(null, filename)
  }
})
const subupload = multer({ storage: subcategorystorage })


const Productstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/product')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname)
    cb(null, filename)
  }
})
const Productupload = multer({ storage: Productstorage })

const category = require("../API/category/categoryController")
const contact = require("../API/Contact/enquiryController")
const product = require('../API/product/productController')
const user = require('../API/user/userController')
const subcategory = require("../API/subcategory/subController")
const dashboard = require("../API/dashboard/dashcontroller")
const order=require("../API/placing order/placeorderController")
//user
adminRouter.post("/user/all", user.allUser)
//product
adminRouter.get("/product/all", product.allProduct)
//category
adminRouter.post('/category/all', category.allCategory)
//subcategory
adminRouter.post('/subcategory/all', subcategory.allSubcategory)
adminRouter.post('/subcategory/single', subcategory.singleSubcategory)

//dashboard
adminRouter.post('/dashboard', dashboard.dashboardApi)
//enquiry
adminRouter.post("/contact/all", contact.allEnquiry)
adminRouter.post('/contact/add', contact.addEnquiry)

//order
adminRouter.post("/order/all",order.orderAll)
// adminRouter.post('/order/single',order.orderSingle)
// adminRouter.post("/order/categorywise",order.categoryWiseOrders)
// adminRouter.put("/order/disable",order.disableAll)
// adminRouter.put("/order/update",order.updateOrder)
//closeAPI
adminRouter.use(require("../API/custom-middlewares/AdminTokenChecker"))
//category
adminRouter.post('/category/add', upload.single("image"), category.addCategory)
adminRouter.post('/category/single', category.singleCategory)
adminRouter.delete('/category/delete', category.deleteCategory)
adminRouter.put('/category/update', category.updateCategory)
adminRouter.post('/category/softdelete', category.softDeleted)



//user

adminRouter.post("/user/delete", user.deleteUser)
//subcategory
adminRouter.post("/subcategory/add", subupload.single("image"), subcategory.addSubcategory)
adminRouter.post("/subcategory/delete", subcategory.deleteSubcategory)
adminRouter.put("/subcategory/update",subcategory.updateSubCategory)
//contact
adminRouter.post('/contact/delete', contact.deleteEnquiry)
adminRouter.post("/contact/single",contact.singleEnquiry)
adminRouter.post("/contact/reply",contact.replyEnquiry)

// product
adminRouter.post('/product/add',Productupload.single("image") ,product.addProduct)
adminRouter.post("/product/delete",product.DeleteProduct)
adminRouter.put("/product/update",product.updateProduct)
adminRouter.post("/product/single",product.singleProduct)

module.exports = adminRouter