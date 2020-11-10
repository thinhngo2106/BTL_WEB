const sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const products = sequelize.define("products", {
        idProduct:{
            type: DataTypes.INTEGER(11),
            primaryKey: true,
        },
        productName:{
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
        idBrand:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idCategory:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },{
        tableName: 'products',
        createdAt: false,
        updatedAt: false,
    });
    return products;
}