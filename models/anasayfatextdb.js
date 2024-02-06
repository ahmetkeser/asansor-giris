const{ DataTypes }=require("sequelize")
const sequelize = require("../data/db")

const anasayfatextdb= sequelize.define("anasayfatext",{
    textid: {                       // veritabanında oluşturulacak tablolar burada tanımlanır.
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type : DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false

    }
})
async function sync(){
    await anasayfatextdb.sync({alter:true})
    console.log("Anasayfa tablosu eklendi")
    const count = await anasayfatextdb.count()
    if(count ==0)
    {
        await anasayfatextdb.create({
            title: "Biz Kimiz?",
            text :"<p>Asansör Firması olarak, uzun yıllara dayanan tecrübemiz ve sektördeki lider konumumuzla müşterilere <i><strong>güvenilir, yenilikçi ve kaliteli asansör çözümleri sunuyoruz</strong></i>.</p>"
        })
        await anasayfatextdb.create({
            title: "Tecrübe ve Güven",
            text :"Şirketimiz, asansör sektöründeki zengin geçmişiyle gurur duyuyor. Yıllar içinde edinilen deneyim ve uzman kadromuz sayesinde, müşterilerimize en son teknolojiyle donatılmış güvenli, dayanıklı ve verimli asansör sistemleri sunabiliyoruz."
        })
        await anasayfatextdb.create({
            title: "Profesyonel Ekibimiz",
            text :"Bünyemizde bulunan uzman mühendislerimiz, teknisyenlerimiz ve proje yöneticilerimiz, her projede en üst düzeyde kalite ve güvenilirlik sağlamak adına bir araya gelmiştir. Müşterilerimize özel çözümler sunmak için sürekli olarak kendimizi geliştirmekte ve sektördeki en son trendleri takip etmekteyiz.."
        })
    }
    
}
sync()
module.exports=anasayfatextdb;