const{ DataTypes }=require("sequelize")
const sequelize = require("../data/db")

const linkpaneldb= sequelize.define("linkpanel",{
    panelid: {                       // veritabanında oluşturulacak tablolar burada tanımlanır.
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    paneltitle: {
        type : DataTypes.STRING,
        allowNull: false
    },
    panelrouter: {
        type: DataTypes.TEXT,
        allowNull: false

    }
},{ 
    timestamps : false // otomatik ekleme ve güncelleme satırı oluşturmaması için bunu yazabiliriz.
})
async function sync(){                        // alter ise veri tabanı şemasında değişiklik varsa aktarılsın
    await linkpaneldb.sync({alter:true}) // force her çalıştığında tablolar varsa siler tekrar oluşturur yayınlama aşamasında burası magrations ile değiştirilecek
    console.log("Link Panel tablosu eklendi")
    // await linkpaneldb.create({
    //     paneltitle:"Hizmetler",
    //     panelrouter:"hizmetler"
    // })
    // await linkpaneldb.create({
    //     paneltitle:"Referanslar",
    //     panelrouter:"referanslar"
    // })
    // await linkpaneldb.create({
    //     paneltitle:"İletişim",
    //     panelrouter:"iletisim"
    // })    
    // Bu yöntemin alternatifi

    const count = await linkpaneldb.count() // veri tabanında tabloda veri yoksa ekler
    if(count==0)
    {
        await linkpaneldb.bulkCreate([
            {paneltitle:"Hizmetler",panelrouter:"hizmetler"},
            {paneltitle:"Referanslar",panelrouter:"referanslar"},
            {paneltitle:"İletişim",panelrouter:"iletisim"}
        ])
        console.log("Veritabanı Standart Verileri Eklendi")
    }
    
}
sync()
module.exports=linkpaneldb