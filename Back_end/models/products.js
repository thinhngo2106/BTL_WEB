const sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const products = sequelize.define("products", {
        idproduct:{
            type: DataTypes.INTEGER(11),
            primaryKey: true,
        },
        productName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        pSummary:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        productPrice:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,

        },
        quantityInStock:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return products;
}