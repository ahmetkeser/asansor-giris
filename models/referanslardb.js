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
module.exports=referanslardb