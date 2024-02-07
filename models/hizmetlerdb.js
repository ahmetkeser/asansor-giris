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
module.exports=hizmetlerdb