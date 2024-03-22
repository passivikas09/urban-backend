const e = require('express')
const contact = require('./contactModel')

//add
async function addEnquiry(req, res) {
    let formData = req.body
    let validation = []
    let { name, message, email } = formData
    if (!name) {
        validation.push("name")
    }
    if (!email) {
        validation.push('email')
    }
    if (!message) {
        validation.push('message')
    }
    if (validation.length > 0) {
        res.send({
            success: false,
            status: 400,
            message: validation.join('+') + "required"
        })
    } else {
        let contactObj = new contact()
        let total = await contact.countDocuments({ isdeleted: false })
        contactObj.autoId = total + 1
        contactObj.name = formData.name
        contactObj.email = formData.email
        contactObj.message = formData.message
        contactObj.save().then((item) => {
            res.send({
                success: true,
                status: 200,
                message: "we will respond you soon",
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

//all
function allEnquiry(req, res) {
    contact.find({ isdeleted: false }).sort({ createdAt: -1 }).then((item) => {
        res.send({
            success: true,
            status: 200,
            message: "All Enquiry Loaded",
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
//single
function singleEnquiry(req, res) {
    contact.findOne({ _id: req.body._id }).then((item) => {
        if (item) {
            res.send({
                success: true,
                status: 200,
                message: "loaded successfully",
                data: item
            })
        } else{
            res.send({
                success: false,
                status: 400,
                message: "Something went Wrong"
            })
        }
    }).catch((err) => {
        res.send({
            success: false,
            status: 500,
            message: "Error" + err
        })
    })
}

// delete

function deleteEnquiry(req, res) {
    contact.findOne({ _id: req.body._id, isdeleted: false }).then((item) => {
        if (!item) {
            res.send({
                success: false,
                status: 404,
                message: "Enquiry not Found"
            })
        } else {
            item.isdeleted = true
            item.save().then((item) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "Deleted successfully",
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
    }).catch((err) => {
        res.send({
            success: false,
            status: 500,
            message: "Error" + err
        })
    })
}

function replyEnquiry(req, res) {
    let formdata = req.body
    let { _id, reply } = formdata
    let validation = []
    if (!_id) {
        validation.push("userId")
    }
    if (!reply) {
        validation.push("reply")
    }
    if (validation.length > 0) {
        res.send({
            success: false,
            status: 400,
            message: validation.join("+") + "required"
        })
    } else {
        contact.findOne({ _id:formdata._id }).then((item) => {
            if (!item) {
                res.send({
                    success: false,
                    status: 404,
                    message: "Enquiry not found"
                })
            } else {
                if (!!formdata.reply) item.reply = formdata.reply
                item.save().then((item) => {
                    res.send({
                        success: true,
                        status: 200,
                        message: "replied successfully",
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
        }).catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: "Error" + err
            })
        })
    }
}

module.exports = { addEnquiry, deleteEnquiry, allEnquiry, singleEnquiry ,replyEnquiry}