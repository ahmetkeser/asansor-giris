const express = require("express")
const router = express.Router()
router.use("/hizmetler-edit",function(req,res){
    res.render("admin/hizmetler-edit",{
        title:"add blog"
    })
})
router.use("/referanslar-edit",function(req,res){
    res.render("admin/referanslar-edit")
})
router.use("/index-edit",function(req,res){
    res.render("admin/index-edit")
})
router.use("/categories",function(req,res){
    res.render("admin/index-edit")
})
module.exports = router