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

module.exports=iletisimdb