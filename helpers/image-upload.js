// klasörden resim ekleme için multi kütüphanesini indirdik ve gerekli tanımlamalar burada yapuldı

const multer = require("multer")
const path =require("path") // resmin dosya ismini almak için pet modülünü kullandık
const storage = multer.diskStorage({
    destination : function(req,file,cb){ 
        cb(null,'./public/images/') // konum bilgisi
    },
    filename: function(req,file,cb){ // kayıt sonrası verilecek isim
        cb(null, path.parse(file.originalname).name +"-"+ Date.now()+path.extname(file.originalname))
    }

})
const upload = multer({
    storage:storage
})

module.exports.upload=upload