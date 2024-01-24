const express = require("express")
const router = express.Router()

const db = require("../data/db")
//-------------------------------------------------
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
router.get("/hizmet-delete/:hizid",async function(req,res){
    const hizmetid=req.params.hizid
    try{
        const [gelenHizmet, ] = await db.execute("SELECT * FROM hizmetler WHERE hizmetid=?", [hizmetid]);
        const hizmet=gelenHizmet[0]
        res.render("admin/hizmet-delete",{
            title:"Hizmet Silme",
            hizmet:hizmet
        })
    }catch(err){console.log(err)}
    
})
// hizmet listesinden silinmek istenen kaydı getirip silme onayı veri tabanına göndererek silme işlemini tamamlar
router.post("/hizmet-delete/:hizid", async function(req,res){
    const hizmetid = req.body.hizmetid
    try{
        await db.execute("DELETE FROM hizmetler WHERE hizmetid=?",[hizmetid])
        res.redirect("/admin/hizmetler-list")
    }catch(err){console.log(err)}
})
// yeni girilecek hizmet kaydını kullanıcıdan alır
router.get("/hizmet-add", async function(req,res){
    try{
        res.render("admin/hizmet-add",{
            title:"Hizmet Ekle"
        })
    }catch(err){
        console.log(err)
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
//-------------------------------------------------
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
            title:"Referans Ekle",
        })
    }catch(err){
        console.log(err)
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
// silme seçimi yapılan referans kaydını veritabanından getirir
router.get("/referans-delete/:refid", async function(req,res){
    const id = req.params.refid
    console.log("gelen")
    try{
        const [veri, ] = await db.execute("select * from referanslar where referansid=?",[id])
        res.render("admin/referans-delete",{
            title:"Silme İşlemi Onay Sayfası",
            gelen:veri
        })
    }
    catch(err){console.log(err)}
})
// onayı alınan silme işlemini veritabanına silme kodunu gönderir
router.post("/referans-delete/:refid", async function(req,res){
    const id = req.params.refid
    try{
        await db.execute("Delete From referanslar where referansid=?",[id])
        res.redirect("/admin/referans-list")
    }
    catch(err){console.log(err)}
})
//-------------------------------------------------
// anasayfa içeriğini kullanıcıdan alır
router.get("/index-add", async function(req,res){
    try{
        res.render("admin/index-add",{
            title:"Anasayfa İçerik Ekle"
        })
    }catch(err){console.log(err)}
})
//kullanıcıdan alınan anasayfa içeriği veritabanına işlenir
router.post("/index-add",async function (req,res) {
    const title=req.body.baslik
    const text = req.body.aciklama
    try{
        await db.execute("INSERT INTO anasayfatext (title,text) VALUES (?,?)",[title,text])
        res.redirect("/admin/index-list")
    }
    catch(err){console.log(err)}
    
})
// anasayfa düzenlemek için veritabanındaki anasayfatext tablosunu getirir
router.get("/index-list",async function(req,res){
    try{
        const [gelen, ] = await db.execute("select * from anasayfatext")
        res.render("admin/index-list",{
            title:"Anasayfa Bilgi Düzenle",
            gelen:gelen
        })
    }catch(err){
        console.log(err)
    }
})
// index listesinden seçilen kaydı düzenleme sayfasına gönderir vvv
router.get("/index-edit/:textid", async function(req,res){
    const inid =req.params.textid
    // const indextitle=req.body.baslik
    // const indextext = req.body.aciklama
    try{
        const[veri, ]=await db.execute("select * from anasayfatext where textid = ?",[inid])
        const gelen=veri[0]
        if(gelen){
            return res.render("admin/index-edit",{
                title:"index verisi güncelle",
                gelen:gelen,
            })
        }
        res.redirect("admin/index-list")
        
    }catch(err){

    }
})
// index listesinden düzennleme için gelen kaydı veri tabanına gönderir vvv
router.post("/index-edit/:textid", async function(req,res){
    const textid =req.params.textid
    const title=req.body.baslik
    const text = req.body.aciklama
    try{
        const[gelen, ]=await db.execute("UPDATE anasayfatext SET title=? , text=? WHERE textid=?" ,[title, text, textid ])
        res.redirect("/admin/index-list")
        
    }catch(err){
        console.log(err)
    }
})
router.get("/index-delete/:textid", async function(req,res){
    const id = req.params.textid

    try{
        const [veri, ]=await db.execute("select * from anasayfatext Where textid=?",[id])
        const gelen = veri[0]
        res.render("admin/index-delete",{
            title : "Anasayfa İçerik Silme İşlemi",
            gelen:gelen
        })
    }catch(err){console.log(err)}
})
router.post("/index-delete/:textid", async function(req,res){
    const id=req.params.textid
    try{
        await db.execute("DELETE FROM anasayfatext where textid=?",[id])
        res.redirect("/admin/index-list")
    }catch(err){
        console.log(err)
    }
})



router.use("/categories",function(req,res){
    res.render("admin/index-edit")
})
module.exports = router