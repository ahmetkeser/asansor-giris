//const mysql=require("mysql2") // import ettiğimiz mysql2 kütüphanesini çağırıyoruz
const config=require("../config") // slq bilgilerini sakladığımız kendi dosyamızı çağırdık
// let connection=mysql.createConnection(config.db) // yeni bir mysql bağlantısı oluşturduk
// connection.connect(function(err){ // bağlantıyı başlattık
//     if(err){
//        return console.log(err) // bağlantı hatasını yakalamak için yazdık
//     }
//     console.log("mysql server bağlantısı yapıldı")
// })
// module.exports=connection.promise()

const Sequlize= require("sequelize")
const sequelize= new Sequlize(config.db.database , config.db.user, config.db.password, {
    dialect: "mysql",
    host: config.db.host
})
async function connect(){
    try{
        await sequelize.authenticate();
        console.log("Yeni mysql server bağlanısı yapıldı.")
    }
    catch(err){
        console.log("Bağlantı Hatası...",err)
    }
}

connect()
module.exports=sequelize