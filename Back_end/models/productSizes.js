const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const productsizes = sequelize.define("productsizes", {
        idSize:{
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        productSize:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantityInStock:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        tableName: 'productsizes',
        createdAt: false,
        updatedAt: false,
    });
    return productsizes;
}