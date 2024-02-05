const express = require("express")
const router=express.Router()
const db=require("../data/db")// sql bağlantısını çağırdık

router.use("/hizmetler/:hizmetid", async function(req,res){
    const hizid=req.params.hizmetid
    try{
        
        const [hizmet, ] = await db.execute("select * from hizmetler where hizmetid=?",[hizid])
        const [linkbar, ]=await db.execute("select * from linkpanel")
        if(hizmet[0]){ //kullanıcının talep ettiği idli hizmet varsa çalışır
            
            return res.render("users/hizmet-detay",{hizmet:hizmet[0],linkbar,title:hizid})
        }
        res.redirect("/") // eğer hizmetler tablosunda kullanıcının talep ettiği id li bir hizmet yoksa ana sayfaya yönlendirir
    }
    catch(err){console.log(err)}
})

router.use("/iletisim", async function(req,res){
    try{
        const res2=await db.execute("select * from linkpanel")
        res.render("users/iletisim",{
            title:"İletişim",
            linkbar:res2[0] 
        })
        // const [linkbar, ]=await db.execute("select * from linkpanel")
        // res.render("users/iletisim",linkbar)  Yukardaki kullanımın alternatifi - await işlemin problemsiz çalışmasını bekletir. Ayrıca [linkbar, ] bu sorgudan gelen dizinin ilk indisini dizi olarak linkbar a atar.
    }   
    catch(err){console.log(err)}
})
router.use("/referanslar", async function(req,res){
    try{
        const res1 =await db.execute("select * from referanslar")
        const res2=await db.execute("select * from linkpanel")
        res.render("users/referanslar",{
            title:"Referanslar",
            referanslar : res1[0],
            linkbar:res2[0]
        })// 
    }   
    catch(err){console.log(err)}
})
router.use("/hizmetler", async function(req,res){
    try{
        const res1 =await db.execute("select * from hizmetler")
        const res2=await db.execute("select * from linkpanel")
        res.render("users/hizmetler",{
            title:"Hizmetler",
            categories : res1[0],
            linkbar:res2[0]
        })// 
    }   
    catch(err){console.log(err)}
    
})
router.use("/",async function(req,res){ // talep yazıldığı zaman karşılanması için
    try{
        const res1 =await db.execute("select * from anasayfatext")
        const res2=await db.execute("select * from linkpanel")
        res.render("users/index",{
            title:"Anasayfa",
            bodytext : res1[0],
            linkbar:res2[0]
        })// 
    }   
    catch(err){console.log(err)}
    
})

module.exports=router