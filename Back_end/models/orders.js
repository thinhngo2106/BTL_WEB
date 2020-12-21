const sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const orders = sequelize.define("orders", {
        idOrder:{
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        customerName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderDate:{
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber:{
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
        shippingPrice:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        }, 
        paymentMethod:{
            type: DataTypes.STRING,
            allowNull:false,
        }
    },{
        tableName: 'orders',
        createdAt: false,
        updatedAt: false,
    });
    return orders;
}