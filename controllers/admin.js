const exp = require("constants")
const Anasayfatextdb = require("../models/anasayfatextdb")
const Hizmetlerdb = require("../models/hizmetlerdb")
const Iletisimdb = require("../models/iletisimdb")
const Linkpaneldb = require("../models/linkpaneldb")
const Referanslardb = require("../models/referanslardb")
const fs=require("fs") // resim güncelleme işleminde yeni seçilen resim durumunda eski resmi dosyadan silme işlemi için fs modülünü kullandık.

exports.get_hizmetler_list =async function(req,res){
    try{
       const gelenHizmet =await Hizmetlerdb.findAll()
        res.render("admin/hizmetler-list",{
            pagetitle:"Hizmet Düzenle",
            gelenHizmet: gelenHizmet,
            action: req.query.action,
            id: req.query.id
        })
    }catch(err){ console.log(err) }
}
exports.get_hizmet_edit =async function(req,res){
    const hizid =req.params.hizid
    // const hizmettitle=req.body.baslik
    // const hizmettext = req.body.aciklama
    // const hizmetresim = req.body.resim
    try{
        // const[gelenHizmet, ]=await db.execute("select * from hizmetler where hizmetid = ?",[hizid])
                    // const gelen=await Hizmetlerdb.findAll({
                    //     where:{
                    //         hizmetid:hizid
                    //     }
                    // })
        
        const gelen = await Hizmetlerdb.findByPk(hizid) // veritabanından primarykey e göre çağırma yapar findByPk
        if(gelen){
            return res.render("admin/hizmet-edit",{
                pagetitle:"Hizmet Düzenle",
                gelen:gelen.dataValues,
            })
        }
        res.redirect("admin/hizmetler-list")
        
    }catch(err){console.log(err)}
}
exports.post_hizmet_edit =async function(req,res){
    const hizmetid =req.body.hizmetid
    const hizmettitle=req.body.baslik
    const hizmettext = req.body.aciklama
    let hizmetresim = req.body.resim
    if(req.file){ //file bilgisi set edildi ise
        hizmetresim=req.file.filename // resim seçildi isegüncelleme ile gelen orjinal resim yerine yeni resim seçimi burada yapılır.
        fs.unlink("./public/images/"+req.body.resim //klasördeki eski resmi fs modülü ile siler, aksi durumda hata mesjı verir.
            // console.log(err+"yakala")
        )
    }
    try{
        const gelenHizmet = await Hizmetlerdb.findByPk(hizmetid)
        if(gelenHizmet){
            gelenHizmet.hizmettitle = hizmettitle,
            gelenHizmet.hizmettext = hizmettext,
            gelenHizmet.hizmetresim = hizmetresim
            await gelenHizmet.save()
            return res.redirect("/admin/hizmetler-list?action=edit&id="+hizmetid)
        }
        // const[gelenHizmet, ]=await db.execute("UPDATE hizmetler SET hizmettitle=? , hizmettext=? ,hizmetresim=? WHERE hizmetid=?" ,[hizmettitle, hizmettext,hizmetresim, hizmetid ])
        const gelen=gelenHizmet[0]
        res.redirect("/admin/hizmetler-list")
    }catch(err){
        console.log(err)
    }
}
exports.get_hizmet_delete =async function(req,res){
    const hizmetid=req.params.hizid
    try{
        const hizmet = await Hizmetlerdb.findByPk(hizmetid,{raw:true})
        if(hizmet){
           return res.render("admin/hizmet-delete",{
                pagetitle:"Hizmet Silme",
                hizmet:hizmet
            })
        }
        res.render("admin/hizmet-list")
    }catch(err){console.log(err)}
    
}
exports.post_hizmet_delete=async function(req,res){
    const hizmetid = req.body.hizmetid
    try{
        const hizmet = await Hizmetlerdb.findByPk(hizmetid)
        if(hizmet){
            await hizmet.destroy()
            return res.redirect("/admin/hizmetler-list?action=delete&id="+hizmetid)
        }
        res.redirect("/admin/hizmetler-list")
    }catch(err){console.log(err)}
}
exports.get_hizmet_add=async function(req,res){
    try{
        res.render("admin/hizmet-add",{
            pagetitle:"Hizmet Ekle"
        })
    }catch(err){
        console.log(err)
    }
}
exports.post_hizmet_add=async function(req,res){
    const hizmettitle=req.body.baslik
    const hizmettext = req.body.aciklama
    const hizmetresim = req.file.filename // resim dosya şeklinde yükleneceği için multi kütüphanesi kuruldu
    try{
        await Hizmetlerdb.create({hizmettitle:hizmettitle,hizmettext:hizmettext,hizmetresim:hizmetresim})
        res.redirect("/admin/hizmetler-list?action=add") // işlem bittikten sonra hizmetler sayfasına yönlendirir.
    }catch(err){console.log(err)}
}
exports.get_referans_list=async function(req,res){
    try{
       const referanslar=await Referanslardb.findAll()
        res.render("admin/referans-list",{
            pagetitle:"Referans Listesi",
            referanslar: referanslar,
            action: req.query.action,
            id:req.query.id
        })
    }catch(err){ console.log(err) }
}
exports.get_referans_edit=async function(req,res){
    const refid =req.params.refid
    try{
        // const[gelenveri, ]=await db.execute("select * from referanslar where referansid = ?",[refid])
        // const gelen=gelenveri[0]
        const gelen = await Referanslardb.findByPk(refid)
        if(gelen){
            return res.render("admin/referans-edit",{
                pagetitle:"Referans Düzenle",
                gelen:gelen.dataValues,
            })
        }
        res.redirect("admin/referans-list")
        
    }catch(err){

    }
}
exports.post_referans_edit=async function(req,res){
    const referansid =req.body.referansid
    const referanstitle=req.body.baslik
    const referanstext = req.body.aciklama
    let referansresim = req.body.resim
    if(req.file){
        referansresim =req.file.filename
        fs.unlink("./public/images/"+req.body.resim)
    }
    const referansmodel = req.body.model
    try{
        const gelenv = await Referanslardb.findByPk(referansid)
        if(gelenv){
            gelenv.referanstitle= referanstitle
            gelenv.referansresim= referansresim
            gelenv.referansmodel= referansmodel
            gelenv.referanstext= referanstext
            await gelenv.save()
            return res.redirect("/admin/referans-list?action=edit&id="+referansid)
        }
        //const[gelenv, ]=await db.execute("UPDATE referanslar SET referanstitle=? , referansresim=?, referansmodel=?, referanstext=?  WHERE referansid=?" ,[referanstitle,referansresim,referansmodel, referanstext, referansid ])
        const gelen=gelenv[0]
        res.redirect("/admin/referans-list")
        
    }catch(err){console.log(err)}
}
exports.get_referans_add=async function(req,res){
    try{
        res.render("admin/referans-add",{
            pagetitle:"Referans Ekle",
        })
    }catch(err){console.log(err)}
}
exports.post_referans_add=async function(req,res){
    const referanstitle = req.body.baslik
    const referanstext = req.body.aciklama
    const referansmodel = req.body.model
    const referansresim = req.file.filename
    try{
        await Referanslardb.create({referanstitle:referanstitle,referansresim:referansresim,referansmodel:referansmodel,referanstext:referanstext})
        res.redirect("/admin/referans-list?action=add") // işlem bittikten sonra referanslar sayfasına yönlendirir.
    }catch(err){console.log(err)}
}
exports.get_referans_delete=async function(req,res){
    const id = req.params.refid
    try{
        const veri = await Referanslardb.findByPk(id)
        if(veri){
            return res.render("admin/referans-delete",{
                pagetitle:"Silme İşlemi Onay Sayfası",
                gelen:veri
            })
        }
        res.render("admin/referans-list")
    }
    catch(err){console.log(err)}
}
exports.post_referans_delete=async function(req,res){
    const id = req.params.refid
    try{
        const veri = await Referanslardb.findByPk(id)
        if(veri){
            await veri.destroy()
            return res.redirect("/admin/referans-list?action=delete&id="+id)
        }
        res.redirect("/admin/referans-list")
    }
    catch(err){console.log(err)}
}
exports.get_index_add=async function(req,res){
    try{
        res.render("admin/index-add",{
            pagetitle:"Anasayfa İçerik Ekle"
        })
    }catch(err){console.log(err)}
}
exports.post_index_add=async function (req,res) {
    const pagetitle=req.body.baslik
    const text = req.body.aciklama
    try{
        await Anasayfatextdb.create({title:pagetitle,text:text})
        res.redirect("/admin/index-list?action=add")
    }
    catch(err){console.log(err)}
    
}
exports.get_index_list=async function(req,res){
    try{
        const gelen = await Anasayfatextdb.findAll()
        res.render("admin/index-list",{
            pagetitle:"Anasayfa Bilgi Düzenle",
            gelen:gelen,
            action : req.query.action,
            id:req.query.id
        })
    }catch(err){
        console.log(err)
    }
}
exports.get_index_edit=async function(req,res){
    const inid =req.params.textid
    // const indextitle=req.body.baslik
    // const indextext = req.body.aciklama
    try{
        // const[veri, ]=await db.execute("select * from anasayfatext where textid = ?",[inid])
        // const gelen=veri[0]
        const gelen = await Anasayfatextdb.findByPk(inid)
        if(gelen){
            return res.render("admin/index-edit",{
                pagetitle:"index verisi güncelle",
                gelen:gelen.dataValues,
            })
        }
        res.redirect("admin/index-list")
        
    }catch(err){

    }
}
exports.post_index_edit=async function(req,res){
    const textid =req.params.textid
    const title=req.body.baslik
    const text = req.body.aciklama
    try{
        const gelen = await Anasayfatextdb.findByPk(textid)
        if(gelen){
            gelen.title=title
            gelen.text = text

            await gelen.save()
            return res.redirect("/admin/index-list?action=edit&id="+textid)
        }
        //const[gelen, ]=await db.execute("UPDATE anasayfatext SET title=? , text=? WHERE textid=?" ,[title, text, textid ])
        res.redirect("/admin/index-list")
        
    }catch(err){
        console.log(err)
    }
}
exports.get_index_delete=async function(req,res){
    const id = req.params.textid

    try{
        const gelen = await Anasayfatextdb.findByPk(id)
        if(gelen){
            return res.render("admin/index-delete",{
                pagetitle: "Anasayfa İçerik Silme İşlemi",
                gelen:gelen
            })
        }
        res.render("admin/index-list")
    }catch(err){console.log(err)}
}
exports.post_index_delete=async function(req,res){
    const id=req.params.textid
    try{
        const gelen = await Anasayfatextdb.findByPk(id)
        if(gelen){
            await gelen.destroy()
            return res.redirect("/admin/index-list?action=delete&id="+id)
        }
        res.redirect("/admin/index-list")
    }catch(err){
        console.log(err)
    }
}