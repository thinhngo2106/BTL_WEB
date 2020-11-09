const sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const productdetail = sequelize.define("productdetail", {
        productDescription:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        image:{
            type: DataTypes.BLOB("long"),
            allowNull: false,
        }
    });
    return productdetail;
}