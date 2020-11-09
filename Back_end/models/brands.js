const sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const brands = sequelize.define("brands", {
        idBrand:{
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        brandName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        createdAt: false,
        updatedAt: false,
    });
    return brands;
}