const sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const orders = sequelize.define("orders", {
        idOrder:{
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        orderDate:{
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        shippedDate:{
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false,
        },

    },{
        createdAt: false,
        updatedAt: false,
    });
    return orders;
}