const sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const productdetail = sequelize.define("productdetail", {
        idImage:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idProduct:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },

        image:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    },{
        tableName: 'productdetail',
        createdAt: false,
        updatedAt: false,
    });
    return productdetail;
}