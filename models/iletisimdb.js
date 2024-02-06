const{ DataTypes }=require("sequelize")
const sequelize = require("../data/db")

const iletisimdb= sequelize.define("iletisim",{
    iletisimid: {                       // veritabanında oluşturulacak tablolar burada tanımlanır.
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})
async function sync(){ // her çalıştığında tablolar varsa siler tekrar oluşturur yayınlama aşamasında burası magrations ile değiştirilecek
    await iletisimdb.sync({force: true})
    console.log("İletişim tablosu eklendi")
}
sync()
module.exports=iletisimdb