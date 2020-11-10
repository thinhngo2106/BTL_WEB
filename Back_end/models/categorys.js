const sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const categories = sequelize.define("categories", {
        idCategory:{
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        categoryName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        tableName: 'categories',
        createdAt: false,
        updatedAt: false,
    });
    return categories;
}