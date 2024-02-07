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

module.exports=linkpaneldb