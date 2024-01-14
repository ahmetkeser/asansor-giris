const express= require("express")

const app =express()// express modülü bizim için bir uygulama getirmesi gerekir
                    // ve app üzerinden uygulamanın request ve response sini kontrol edeceğiz


const path =require("path")// dosya yollarının birleştirmek için kullanıcazz serverin tam yolunu getirecek
const userRoutes=require("./routes/user") // user yönlendirme işlemlerini kullanabilmek için dosya import ediliyor 
const adminRoutes=require("./routes/admin") // user yönlendirme işlemlerini kullanabilmek için dosya import ediliyor 

// app.use ile gelen istekleri kontrol ederiz bu express modülün bir fonksiyonudur.
app.use("/libs",express.static(path.join(__dirname,"node_modules")))// node_modulesin yoluna takma isim verdik
app.use("/static",express.static(path.join(__dirname,"public")))

app.use("/admin",adminRoutes)// admin için yönlendiriciyi çalıştırır bu bir midelwear ara yazılım örneğidir "/admin" neden var dersen herzaman /admin ile başlayan uzantıları karşılar
app.use(userRoutes)// user için yönlendiriciyi çalıştırır bu bir midelwear ara yazılım örneğidir

app.listen(3000,function(){ // 3000 portunda bir server oluşturduk
    console.log("Listenin on port 3000")
})