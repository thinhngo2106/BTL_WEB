const sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const orderdetail = sequelize.define("orderdetail", {
        idOrder:{
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
        },
        idProduct:{
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
        },
        priceEach:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        quantityOrder:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    },{
        tableName: 'orderdetail',
        createdAt: false,
        updatedAt: false,
    });
    return orderdetail;
}