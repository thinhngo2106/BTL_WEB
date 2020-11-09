const sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const productdetail = sequelize.define("productdetail", {
        idProduct:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        productDescription:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        image:{
            type: DataTypes.BLOB("long"),
            allowNull: false,
        }
    },{
        createdAt: false,
        updatedAt: false,
    });
    return productdetail;
}