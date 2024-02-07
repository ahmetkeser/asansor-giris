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

module.exports=anasayfatextdb;