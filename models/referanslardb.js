const{ DataTypes }=require("sequelize")
const sequelize = require("../data/db")

const referanslardb= sequelize.define("referanslar",{
    referansid: {                       // veritabanında oluşturulacak tablolar burada tanımlanır.
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    referanstitle: {
        type : DataTypes.STRING,
        allowNull: false
    },
    referansresim: {
        type: DataTypes.STRING,
        allowNull: false

    },
    referansmodel: {
        type: DataTypes.STRING,
        allowNull: false

    },
    referanstext: {
        type: DataTypes.TEXT,
        allowNull: false

    }
})
async function sync(){ // her çalıştığında tablolar varsa siler tekrar oluşturur yayınlama aşamasında burası magrations ile değiştirilecek
    await referanslardb.sync({alter:true})
    console.log("Referanslar tablosu eklendi")
    const count = await referanslardb.count()
    if(count==0){
        await referanslardb.bulkCreate([
            {
                referanstitle:"Ada Otel",
                referansresim:"asan-5.jpeg",
                referansmodel:"M3Tn",
                referanstext:"Güncellendi..."
            },
            {
                referanstitle:"Kule Ankara",
                referansresim:"asan-6.jpeg",
                referansmodel:"M8Trn",
                referanstext:"qwe"
            },
            {
                referanstitle:"Cancak Merkez AVM",
                referansresim:"asan-7.jpeg",
                referansmodel:"M4Tn",
                referanstext:"qwe"
            },
            {
                referanstitle:"Kalkan Hotels",
                referansresim:"asan-8.jpeg",
                referansmodel:"M1Tn",
                referanstext:"qwe"
            },
            {
                referanstitle:"Kök Mimarlık",
                referansresim:"asan-9.jpeg",
                referansmodel:"M1Tn",
                referanstext:"qwe"
            }
            
        ])
    }
}
sync()
module.exports=referanslardb