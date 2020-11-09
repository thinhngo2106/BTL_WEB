const sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const orderdetail = sequelize.define("orderdetail", {
        priceEach:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        quantityOrder:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    });
    return orderdetail;
}