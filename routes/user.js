const express = require("express")
const router=express.Router()
const Anasayfatextdb = require("../models/anasayfatextdb")
const Hizmetlerdb = require("../models/hizmetlerdb")
const Iletisimdb = require("../models/iletisimdb")
const Linkpaneldb = require("../models/linkpaneldb")
const Referanslardb = require("../models/referanslardb")
const hizmetlerdb = require("../models/hizmetlerdb")

router.use("/hizmetler/:hizmetid", async function(req,res){
    const hizid=req.params.hizmetid
    try{
        
        // const [hizmet, ] = await db.execute("select * from hizmetler where hizmetid=?",[hizid])
        const hizmet = await Hizmetlerdb.findByPk(hizid)
        // const [linkbar, ]=await db.execute("select * from linkpanel")
        if(hizmet){ //kullanıcının talep ettiği idli hizmet varsa çalışır
            
            return res.render("users/hizmet-detay",{hizmet:hizmet.dataValues,title:hizid})
        }
        res.redirect("/") // eğer hizmetler tablosunda kullanıcının talep ettiği id li bir hizmet yoksa ana sayfaya yönlendirir
    }
    catch(err){console.log(err)}
})

router.use("/iletisim", async function(req,res){
    try{
        // const res2=await db.execute("select * from linkpanel")
        const res2=await Linkpaneldb.findAll({raw:true})
        res.render("users/iletisim",{
            title:"İletişim",
            linkbar:res2
        })
        // const [linkbar, ]=await db.execute("select * from linkpanel")
        // res.render("users/iletisim",linkbar)  Yukardaki kullanımın alternatifi - await işlemin problemsiz çalışmasını bekletir. Ayrıca [linkbar, ] bu sorgudan gelen dizinin ilk indisini dizi olarak linkbar a atar.
    }   
    catch(err){console.log(err)}
})
router.use("/referanslar", async function(req,res){
    try{
        // const res1 =await db.execute("select * from referanslar")
        const res1 =await Referanslardb.findAll({raw:true})
        // const res2=await db.execute("select * from linkpanel")
        const res2=await Linkpaneldb.findAll({raw:true})
        res.render("users/referanslar",{
            title:"Referanslar",
            referanslar : res1,
            linkbar:res2
        })// 
    }   
    catch(err){console.log(err)}
})
router.use("/hizmetler", async function(req,res){
    try{
        // const res1 =await db.execute("select * from hizmetler")
        const res1 =await Hizmetlerdb.findAll({raw:true})
        // const res2=await db.execute("select * from linkpanel")
        const res2=await Linkpaneldb.findAll({raw:true})
        res.render("users/hizmetler",{
            title:"Hizmetler",
            categories : res1,
            linkbar:res2
        })// 
    }   
    catch(err){console.log(err)}
    
})

router.use("/",async function(req,res){ // talep yazıldığı zaman karşılanması için
    try{
        // const res1 =await db.execute("select * from anasayfatext")
        const res1 =await Anasayfatextdb.findAll({raw:true})
        // const res2=await db.execute("select * from linkpanel")
        const res2=await Linkpaneldb.findAll({raw:true})
        res.render("users/index",{
            title:"Anasayfa",
            bodytext : res1,
            linkbar:res2
        })// 
    }   
    catch(err){console.log(err)}
    
})

module.exports=router