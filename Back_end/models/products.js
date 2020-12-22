const sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const products = sequelize.define("products", {
        idProduct:{
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        productName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        productPrice:{
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        productDescription:{
            type: DataTypes.TEXT,
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
        indexes: [
            {
                type:'FULLTEXT',
                name: 'productName',
                fields: ['productName']
            }
        ]
    });
    return products;
}