const express = require("express")
const router=express.Router()
const db=require("../data/db")// sql bağlantısını çağırdık
// const data={
//     title:"hizmetler",
//     categories:[
//         {
//             hizmetid:1,
//             baslik:"Asansör Kurulumu ve Montaj",
//             aciklama:"Firmamız, uzman ekibiyle birlikte modern ve güvenli asansör sistemlerinin kurulumunu üstlenir. Yapılan detaylı inceleme sonrasında, binanızın ihtiyaçlarına uygun özel çözümler sunarak, asansörlerinizi en etkili şekilde monte ederiz.",
//             resim:"asan-1.jpeg"
//         },
//         {
//             hizmetid:2,
//             baslik:"Asansör Bakım ve Onarım",
//             aciklama:"Var olan asansör sistemlerinizin düzenli bakımını üstleniyoruz. Güvenlik standartlarına uygun bir şekilde periyodik bakımlar gerçekleştirerek, olası arızaları önceden tespit edip gerekli onarımları zamanında yaparız.",
//             resim:"asan-2.jpeg"
//         },
//         {
//             hizmetid:3,
//             baslik:"Modernizasyon Hizmetleri",
//             aciklama:"Teknolojinin gelişmesiyle birlikte eski tip asansör sistemlerini güncellemek önemlidir. Firmamız, mevcut asansörlerinizi modernize etmek ve güncel teknolojiye uyumlu hale getirmek için profesyonel hizmetler sunar.",
//             resim:"asan-3.jpeg"
//         },
//         {
//             hizmetid:3,
//             baslik:"Acil Durum Hizmetleri",
//             aciklama:"Acil durumlar her zaman beklenmeyen durumlar olabilir. Firmamız, 7/24 acil durum asansör servisi ile anında müdahale eder. Ekiplerimiz hızlı ve etkili bir şekilde sorunları çözer, böylece asansörleriniz her zaman güvenli bir şekilde çalışır.",
//             resim:"asan-3.jpeg"
//         },
//         {
//             hizmetid:3,
//             baslik:" Asansör Tasarım ve Danışmanlık",
//             aciklama:"Yeni bir bina inşa ediyorsanız veya mevcut binanızın asansör sistemini değiştirmeyi düşünüyorsanız, firmamız size en uygun tasarımı ve danışmanlığı sunar. Hem estetik hem de fonksiyonel açıdan en uygun çözümleri bulmak için uzman ekibimiz size rehberlik eder.",
//             resim:"asan-3.jpeg"
//         }
//     ],
//     linkBar:[ 
//         {
//             castegoriesTitle:"Hizmetler",
//             categoriesLink:"/hizmetler"
//         },
//         {
//             castegoriesTitle:"Referanslar",
//             categoriesLink:"/referanslar"
//         },
//         {
//             castegoriesTitle:"İletişim",
//             categoriesLink:"/iletisim"
//         }
//     ]
// }
router.use("/iletisim", async function(req,res){
    res.render("users/iletisim",data)// kullanıcı /blogs/5 gibi bir istemde dosya yolunu belirtiyoruz
    try{
        const res1 =await db.execute("select * from hizmetler")
        const res2=await db.execute("select * from linkpanel")
        res.render("users/hizmetler",{
            title:"hizmetler",
            categories : res1[0],
            linkbar:res2[0]
        })// 
    }   
    catch(err){console.log(err)}
})
router.use("/referanslar", async function(req,res){
    res.render("users/referanslar",data)// kullanıcı /blogs/5 gibi bir istemde dosya yolunu belirtiyoruz
    try{
        const res1 =await db.execute("select * from hizmetler")
        const res2=await db.execute("select * from linkpanel")
        res.render("users/hizmetler",{
            title:"hizmetler",
            categories : res1[0],
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
            title:"hizmetler",
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