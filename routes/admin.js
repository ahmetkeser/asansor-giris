const express = require("express")
const router = express.Router()

const db = require("../data/db")

router.get("/hizmetler-list", async function(req,res){
    try{
        const[gelenHizmet, ]=await db.execute("select * from hizmetler")
        return res.render("admin/hizmetler-list",{
            title:"Hizmet Düzenle",
            gelenHizmet: gelenHizmet
        })
        res.redirect("admin/hizmet-adit")
    }catch(err){ console.log(err) }
})

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
router.get("/hizmet-add", async function(req,res){
    try{
        res.render("admin/hizmet-add",{
            title:"Hizmet Ekle",
        })
    }catch(err){

    }
})
router.post("/hizmet-add", async function(req,res){
    const hizmettitle=req.body.baslik
    const hizmettext = req.body.aciklama
    const hizmetresim = req.body.resim
    try{
        await db.execute("INSERT INTO hizmetler (hizmettitle, hizmettext, hizmetresim) VALUES (?, ?, ?)", [hizmettitle, hizmettext, hizmetresim])

        res.redirect("/admin/hizmetler-list") // işlem bittikten sonra hizmetler sayfasına yönlendirir.
    }catch(err){console.log(err)}
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