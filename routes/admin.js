const express = require("express")
const router = express.Router()

const db = require("../data/db")

// Hizmet Listesini veritabanından getirir vvv
router.get("/hizmetler-list", async function(req,res){
    try{
        const[gelenHizmet, ]=await db.execute("select * from hizmetler")
        res.render("admin/hizmetler-list",{
            title:"Hizmet Düzenle",
            gelenHizmet: gelenHizmet
        })
    }catch(err){ console.log(err) }
})
// hizmet listesinden seçilen kaydı düzenleme sayfasına gönderir vvv
router.get("/hizmet-edit/:hizid", async function(req,res){
    const hizid =req.params.hizid
    // const hizmettitle=req.body.baslik
    // const hizmettext = req.body.aciklama
    // const hizmetresim = req.body.resim
    try{
        const[gelenHizmet, ]=await db.execute("select * from hizmetler where hizmetid = ?",[hizid])
        const gelen=gelenHizmet[0]
        if(gelen){
            return res.render("admin/hizmet-edit",{
                title:"Hizmet Düzenle",
                gelen:gelen,
            })
        }
        res.redirect("admin/hizmetler-list")
        
    }catch(err){

    }
})
// hizmet listesinden düzennleme için gelen kaydı veri tabanına gönderir vvv
router.post("/hizmet-edit/:hizid", async function(req,res){
    const hizmetid =req.body.hizmetid
    const hizmettitle=req.body.baslik
    const hizmettext = req.body.aciklama
    const hizmetresim = req.body.resim
    try{
        const[gelenHizmet, ]=await db.execute("UPDATE hizmetler SET hizmettitle=? , hizmettext=? , hizmetresim=? WHERE hizmetid=?" ,[hizmettitle, hizmettext,hizmetresim, hizmetid ])
        const gelen=gelenHizmet[0]
        res.redirect("/admin/hizmetler-list")
        
    }catch(err){
        console.log(err)
    }
})
// hizmet listesinden silinmek istenen kaydı getirip silme onayı alır vvv
router.get("/hizmet-delete/:hizid"),async function(req,res){
    const hizmetid=req.params.hizid
    try{
        const [gelenHizmet, ] = await db.execute("select hizmetler From Where hizmetid=?", [hizmetid])
        const hizmet=gelenHizmet[0]
        req.render("admin/blog-delete",{
            title:"Hizmet Silme",
            hizmet:hizmet
        })
    }catch(err){console.log(err)}
    
}
// hizmet listesinden silinmek istenen kaydı getirip silme onayı veri tabanına göndererek silme işlemini tamamlar
router.post("/hizmet-delete/:hizid"), async function(req,res){
    const hizmetid = req.body.hizmetid
    console.log(hizmetid)
    try{
        await db.execute("DELETE FROM hizmetler WHERE hizmetid=?",[hizmetid])
        res.redirect("/admin/hizmetler-list")
    }catch(err){console.log(err)}
}
// yeni girilecek hizmet kaydını kullanıcıdan alır
router.get("/hizmet-add", async function(req,res){
    try{
        res.render("admin/hizmet-add",{
            title:"Hizmet Ekle",
        })
    }catch(err){

    }
})
// yeni girilecek hizmet kaydını veri tabanına gönderir
router.post("/hizmet-add", async function(req,res){
    const hizmettitle=req.body.baslik
    const hizmettext = req.body.aciklama
    const hizmetresim = req.body.resim
    try{
        await db.execute("INSERT INTO hizmetler (hizmettitle, hizmettext, hizmetresim) VALUES (?, ?, ?)", [hizmettitle, hizmettext, hizmetresim])

        res.redirect("/admin/hizmetler-list") // işlem bittikten sonra hizmetler sayfasına yönlendirir.
    }catch(err){console.log(err)}
})
// Referanslar Listesini veritabanından getirir vvv
router.get("/referans-list", async function(req,res){
    try{
        const[referanslar, ]=await db.execute("select * from referanslar")
        res.render("admin/referans-list",{
            title:"Referans Listesi",
            referanslar: referanslar
        })
    }catch(err){ console.log(err) }
})
// Referanslar listesinden seçilen kaydı düzenleme sayfasına gönderir vvv
router.get("/referans-edit/:refid", async function(req,res){
    const refid =req.params.refid
    try{
        const[gelenveri, ]=await db.execute("select * from referanslar where referansid = ?",[refid])
        const gelen=gelenveri[0]
        if(gelen){
            return res.render("admin/referans-edit",{
                title:"Referans Düzenle",
                gelen:gelen,
            })
        }
        res.redirect("admin/referans-list")
        
    }catch(err){

    }
})
// referans listesinden düzennleme için gelen kaydı veri tabanına gönderir vvv
router.post("/referans-edit/:refid", async function(req,res){
    const referansid =req.body.referansid
    const referanstitle=req.body.baslik
    const referanstext = req.body.aciklama
    const referansresim = req.body.resim
    const referansmodel = req.body.model
    try{
        const[gelenv, ]=await db.execute("UPDATE referanslar SET referanstitle=? , referansresim=?, referansmodel=?, referanstext=?  WHERE referansid=?" ,[referanstitle,referansresim,referansmodel, referanstext, referansid ])
        const gelen=gelenv[0]
        res.redirect("/admin/referans-list")
        
    }catch(err){
        console.log(err)
    }
})
// yeni girilecek referans kaydını kullanıcıdan alır
router.get("/referans-add", async function(req,res){
    try{
        res.render("admin/referans-add",{
            title:"Hizmet Ekle",
        })
    }catch(err){

    }
})
// yeni girilecek referans kaydını veri tabanına gönderir
router.post("/referans-add", async function(req,res){
    const referanstitle=req.body.baslik
    const referanstext = req.body.aciklama
    const referansmodel = req.body.model
    const referansresim = req.body.resim
    try{
        await db.execute("INSERT INTO referanslar (referanstitle, referansresim, referansmodel, referanstext) VALUES (?, ?, ?,?)", [referanstitle, referansresim,referansmodel, referanstext])
        res.redirect("/admin/referans-list") // işlem bittikten sonra referanslar sayfasına yönlendirir.
    }catch(err){console.log(err)}
})

router.use("/index-edit",function(req,res){
    res.render("admin/index-edit")
})
router.use("/categories",function(req,res){
    res.render("admin/index-edit")
})
module.exports = router