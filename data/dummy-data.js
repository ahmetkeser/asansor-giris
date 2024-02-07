const Hizmetlerdb = require("../models/hizmetlerdb")
const Anasayfatextdb = require("../models/anasayfatextdb")
const Linkpaneldb = require("../models/linkpaneldb")
const Iletisimdb = require("../models/iletisimdb")
const Referanslardb = require("../models/referanslardb")
async function populate(){
    await Anasayfatextdb.sync({alter:true})
    console.log("Anasayfa tablosu eklendi")
    const count1 = await Anasayfatextdb.count()
    if(count1 ==0)
    {
        await Anasayfatextdb.create({
            title: "Biz Kimiz?",
            text :"<p>Asansör Firması olarak, uzun yıllara dayanan tecrübemiz ve sektördeki lider konumumuzla müşterilere <i><strong>güvenilir, yenilikçi ve kaliteli asansör çözümleri sunuyoruz</strong></i>.</p>"
        })
        await Anasayfatextdb.create({
            title: "Tecrübe ve Güven",
            text :"Şirketimiz, asansör sektöründeki zengin geçmişiyle gurur duyuyor. Yıllar içinde edinilen deneyim ve uzman kadromuz sayesinde, müşterilerimize en son teknolojiyle donatılmış güvenli, dayanıklı ve verimli asansör sistemleri sunabiliyoruz."
        })
        await Anasayfatextdb.create({
            title: "Profesyonel Ekibimiz",
            text :"Bünyemizde bulunan uzman mühendislerimiz, teknisyenlerimiz ve proje yöneticilerimiz, her projede en üst düzeyde kalite ve güvenilirlik sağlamak adına bir araya gelmiştir. Müşterilerimize özel çözümler sunmak için sürekli olarak kendimizi geliştirmekte ve sektördeki en son trendleri takip etmekteyiz.."
        })
    }
    //-----------------
    await Hizmetlerdb.sync({alter:true})
    console.log("hizmetler tablosu eklendi")

    const count2 = await Hizmetlerdb.count()
    if(count2 ==0)
    {
        await Hizmetlerdb.create({
            hizmettitle:"Asansör Kurulumu ve Montaj",
            hizmettext:"Firmamız, uzman ekibiyle birlikte modern ve güvenli asansör sistemlerinin kurulumunu üstlenir. Yapılan detaylı inceleme sonrasında, binanızın ihtiyaçlarına uygun özel çözümler sunarak, asansörlerinizi en etkili şekilde monte Güncelle.",
            hizmetresim:"asan-1.jpeg"
        })
        await Hizmetlerdb.create({
            hizmettitle:"Asansör Bakım ve Onarım",
            hizmettext:"Var olan asansör sistemlerinizin düzenli bakımını üstleniyoruz. Güvenlik standartlarına uygun bir şekilde periyodik bakımlar gerçekleştirerek, olası arızaları önceden tespit edip gerekli onarımları zamanında yaparız.güncel",
            hizmetresim:"asan-2.jpeg"
        })
        await Hizmetlerdb.create({
            hizmettitle:"Modernizasyon Hizmetleri",
            hizmettext:"Teknolojinin gelişmesiyle birlikte eski tip asansör sistemlerini güncellemek önemlidir. Firmamız, mevcut asansörlerinizi modernize etmek ve güncel teknolojiye uyumlu hale getirmek için profesyonel hizmetler sunar.",
            hizmetresim:"asan-3.jpeg"
        })
        await Hizmetlerdb.create({
            hizmettitle:"Acil Durum Hizmetleri",
            hizmettext:"Acil durumlar her zaman beklenmeyen durumlar olabilir. Firmamız, 7/24 acil durum asansör servisi ile anında müdahale eder. Ekiplerimiz hızlı ve etkili bir şekilde sorunları çözer, böylece asansörleriniz her zaman güvenli bir şekilde çalışır.",
            hizmetresim:"asan-5.jpeg"
        })
        await Hizmetlerdb.create({
            hizmettitle:"Asansör Tasarım ve Danışmanlık",
            hizmettext:"Yeni bir bina inşa ediyorsanız veya mevcut binanızın asansör sistemini değiştirmeyi düşünüyorsanız, firmamız size en uygun tasarımı ve danışmanlığı sunar. Hem estetik hem de fonksiyonel açıdan en uygun çözümleri bulmak için uzman ekibimiz size rehberlik eder.asd",
            hizmetresim:"asan-6.jpeg"
        })
        await Hizmetlerdb.create({
            hizmettitle:"multi kütüphanesi",
            hizmettext:"resimleri klasörlerden seçebilmek için formun özelliklerine file özelliği ekliyoruz daha sonra multi kütüphanesi için gerekli ayarları yapıyoruz",
            hizmetresim:"asan-9.jpeg"
        })
    }
    //---------------
    await Iletisimdb.sync({force: true})
    console.log("İletişim tablosu eklendi")
    //---------------
    await Linkpaneldb.sync({alter:true}) // force her çalıştığında tablolar varsa siler tekrar oluşturur yayınlama aşamasında burası magrations ile değiştirilecek
    console.log("Link Panel tablosu eklendi")
    const count3 = await Linkpaneldb.count() // veri tabanında tabloda veri yoksa ekler
    if(count3==0)
    {
        await Linkpaneldb.bulkCreate([
            {paneltitle:"Hizmetler",panelrouter:"hizmetler"},
            {paneltitle:"Referanslar",panelrouter:"referanslar"},
            {paneltitle:"İletişim",panelrouter:"iletisim"}
        ])
        console.log("Veritabanı Standart Verileri Eklendi")
    }
    //----------------
    await Referanslardb.sync({alter:true})
    console.log("Referanslar tablosu eklendi")
    const count4 = await Referanslardb.count()
    if(count4==0){
        await Referanslardb.bulkCreate([
            {
                referanstitle:"Ada Otel-2",
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
module.exports=populate