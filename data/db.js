const mysql=require("mysql2") // import ettiğimiz mysql2 kütüphanesini çağırıyoruz
const config=require("../config") // slq bilgilerini sakladığımız kendi dosyamızı çağırdık
let connection=mysql.createConnection(config.db) // yeni bir mysql bağlantısı oluşturduk
connection.connect(function(err){ // bağlantıyı başlattık
    if(err){
       return console.log(err) // bağlantı hatasını yakalamak için yazdık
    }
    console.log("mysql server bağlantısı yapıldı")
})
module.exports=connection.promise()