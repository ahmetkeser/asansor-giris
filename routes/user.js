const express = require("express")
const path =require("path")// dosya yollarının birleştirmek için kullanıcazz serverin tam yolunu getirecek
const router=express.Router()

router.use("/iletisim", function(req,res){
    res.sendFile(path.join(__dirname,"../views/users","iletisim.html"))// kullanıcı /blogs/5 gibi bir istemde dosya yolunu belirtiyoruz
})
router.use("/referanslar", function(req,res){
    res.sendFile(path.join(__dirname,"../views/users","referanslar.html"))// kullanıcı /blogs/5 gibi bir istemde dosya yolunu belirtiyoruz
})
router.use("/hizmetler", function(req,res){
    res.sendFile(path.join(__dirname,"../views/users","hizmetler.html"))//
})
router.use("/",function(req,res){ // talep yazıldığı zaman karşılanması için
    res.sendFile(path.join(__dirname,"../views/users","index.html"))//
})

module.exports=router