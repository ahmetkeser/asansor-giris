const express = require("express")
const router = express.Router()
const imageUpload =require("../helpers/image-upload")
const adminController = require("../controllers/admin")



//-------------------------------------------------
// Hizmet Listesini veritabanından getirir
router.get("/hizmetler-list", adminController.get_hizmetler_list )
// hizmet listesinden seçilen kaydı düzenleme sayfasına gönderir vvv
router.get("/hizmet-edit/:hizid", adminController.get_hizmet_edit)
// hizmet listesinden düzennleme için gelen kaydı veri tabanına gönderir vvv
router.post("/hizmet-edit/:hizid",imageUpload.upload.single("resim"), adminController.post_hizmet_edit)
// hizmet listesinden silinmek istenen kaydı getirip silme onayı alır vvv
router.get("/hizmet-delete/:hizid", adminController.get_hizmet_delete)
// hizmet listesinden silinmek istenen kaydı getirip silme onayı veri tabanına göndererek silme işlemini tamamlar
router.post("/hizmet-delete/:hizid", adminController.post_hizmet_delete)
// yeni girilecek hizmet kaydını kullanıcıdan alır
router.get("/hizmet-add", adminController.get_hizmet_add)
// yeni girilecek hizmet kaydını veri tabanına gönderir
router.post("/hizmet-add",imageUpload.upload.single("resim") ,adminController.post_hizmet_add)
//-------------------------------------------------
// Referanslar Listesini veritabanından getirir vvv
router.get("/referans-list", adminController.get_referans_list)
// Referanslar listesinden seçilen kaydı düzenleme sayfasına gönderir vvv
router.get("/referans-edit/:refid", adminController.get_referans_edit)
// referans listesinden düzennleme için gelen kaydı veri tabanına gönderir vvv
router.post("/referans-edit/:refid",imageUpload.upload.single("resim"), adminController.post_referans_edit)
// yeni girilecek referans kaydını kullanıcıdan alır
router.get("/referans-add", adminController.get_referans_add)
// yeni girilecek referans kaydını veri tabanına gönderir
router.post("/referans-add",imageUpload.upload.single("resim"), adminController.post_referans_add)
// silme seçimi yapılan referans kaydını veritabanından getirir
router.get("/referans-delete/:refid", adminController.get_referans_delete)
// onayı alınan silme işlemini veritabanına silme kodunu gönderir
router.post("/referans-delete/:refid", adminController.post_referans_delete)
//-------------------------------------------------
// anasayfa içeriğini kullanıcıdan alır
router.get("/index-add", adminController.get_index_add)
//kullanıcıdan alınan anasayfa içeriği veritabanına işlenir
router.post("/index-add",adminController.post_index_add)
// anasayfa düzenlemek için veritabanındaki anasayfatext tablosunu getirir
router.get("/index-list",adminController.get_index_list)
// index listesinden seçilen kaydı düzenleme sayfasına gönderir vvv
router.get("/index-edit/:textid", adminController.get_index_edit)
// index listesinden düzennleme için gelen kaydı veri tabanına gönderir vvv
router.post("/index-edit/:textid", adminController.post_index_edit)
router.get("/index-delete/:textid", adminController.get_index_delete)
router.post("/index-delete/:textid", adminController.post_index_delete)

module.exports = router