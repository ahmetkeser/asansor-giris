const{ DataTypes }=require("sequelize")
const sequelize = require("../data/db")

const hizmetlerdb= sequelize.define("hizmetler",{
    hizmetid: {                       // veritabanında oluşturulacak tablolar burada tanımlanır.
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    hizmettitle: {
        type : DataTypes.STRING,
        allowNull: false
    },
    hizmettext: {
        type: DataTypes.TEXT,
        allowNull: false

    },
    hizmetresim: {
        type: DataTypes.STRING,
        allowNull: false

    }
})
async function sync(){ 
    await hizmetlerdb.sync({alter:true})
    console.log("hizmetler tablosu eklendi")

    const count = await hizmetlerdb.count()
    if(count ==0)
    {
        await hizmetlerdb.create({
            hizmettitle:"Asansör Kurulumu ve Montaj",
            hizmettext:"Firmamız, uzman ekibiyle birlikte modern ve güvenli asansör sistemlerinin kurulumunu üstlenir. Yapılan detaylı inceleme sonrasında, binanızın ihtiyaçlarına uygun özel çözümler sunarak, asansörlerinizi en etkili şekilde monte Güncelle.",
            hizmetresim:"asan-1.jpeg"
        })
        await hizmetlerdb.create({
            hizmettitle:"Asansör Bakım ve Onarım",
            hizmettext:"Var olan asansör sistemlerinizin düzenli bakımını üstleniyoruz. Güvenlik standartlarına uygun bir şekilde periyodik bakımlar gerçekleştirerek, olası arızaları önceden tespit edip gerekli onarımları zamanında yaparız.güncel",
            hizmetresim:"asan-2.jpeg"
        })
        await hizmetlerdb.create({
            hizmettitle:"Modernizasyon Hizmetleri",
            hizmettext:"Teknolojinin gelişmesiyle birlikte eski tip asansör sistemlerini güncellemek önemlidir. Firmamız, mevcut asansörlerinizi modernize etmek ve güncel teknolojiye uyumlu hale getirmek için profesyonel hizmetler sunar.",
            hizmetresim:"asan-3.jpeg"
        })
        await hizmetlerdb.create({
            hizmettitle:"Acil Durum Hizmetleri",
            hizmettext:"Acil durumlar her zaman beklenmeyen durumlar olabilir. Firmamız, 7/24 acil durum asansör servisi ile anında müdahale eder. Ekiplerimiz hızlı ve etkili bir şekilde sorunları çözer, böylece asansörleriniz her zaman güvenli bir şekilde çalışır.",
            hizmetresim:"asan-5.jpeg"
        })
        await hizmetlerdb.create({
            hizmettitle:"Asansör Tasarım ve Danışmanlık",
            hizmettext:"Yeni bir bina inşa ediyorsanız veya mevcut binanızın asansör sistemini değiştirmeyi düşünüyorsanız, firmamız size en uygun tasarımı ve danışmanlığı sunar. Hem estetik hem de fonksiyonel açıdan en uygun çözümleri bulmak için uzman ekibimiz size rehberlik eder.asd",
            hizmetresim:"asan-6.jpeg"
        })
        await hizmetlerdb.create({
            hizmettitle:"multi kütüphanesi",
            hizmettext:"resimleri klasörlerden seçebilmek için formun özelliklerine file özelliği ekliyoruz daha sonra multi kütüphanesi için gerekli ayarları yapıyoruz",
            hizmetresim:"asan-9.jpeg"
        })
    }
 
}
sync()
module.exports=hizmetlerdb