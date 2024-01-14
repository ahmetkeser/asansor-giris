const express = require("express")
const router = express.Router()
router.use("/hizmetler",function(req,res){
    res.render("admin/hizmetler-edit")
})
router.use("/referanslar",function(req,res){
    res.render("admin/referanslar-edit")
})
router.use("/index",function(req,res){
    res.render("admin/index-edit")
})
module.exports = router