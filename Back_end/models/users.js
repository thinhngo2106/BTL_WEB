const sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        idUser:{
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        userEmail:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        userPassword:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        userFname:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        userLname:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        address:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },{
        tableName: 'users',
        createdAt: false,
        updatedAt: false,
    });
    return users;
};
