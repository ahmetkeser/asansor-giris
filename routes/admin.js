const express = require("express")
const router = express.Router()
const path = require ("path")
router.use("/hizmetler",function(req,res){
    res.sendFile(path.join(__dirname,"../views/admin","hizmetler-edit.html"))
})
router.use("/referanslar",function(req,res){
    res.sendFile(path.join(__dirname,"../views/admin","referanslar-edit.html"))
})
router.use("/index",function(req,res){
    res.sendFile(path.join(__dirname,"../views/admin","index-edit.html"))
})
module.exports = router