const express = require("express");
const db = require('../models');
const orderRouter = express.Router();
const expressAsyncHandler =  require('express-async-handler');
const { isAdmin, isAuth} = require('../utlis');

orderRouter.post(  '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
      } else {
        const order = await db.orders.create({
          orderDate: req.body.orderDate,
          status: req.body.status,
          shippedDate: req.body.shippedDate,
          address: req.body.shipAddress,
          paymentMethod: req.body.paymentMethod,
          shippingPrice: req.body.shippingPrice,
          idUser: req.user.id,
        });
        const array = req.body.orderItems;
        res.send({array});
        array.forEach(async(element) => {
            await db.orderdetail.create({
              idOrder: order.idOrder,
              idProduct: element.product,
              priceEach: element.price,
              quantityOrder: element.qty,
            })
        });

      }
      }
  )
);
orderRouter.get(
    '/mine',

    expressAsyncHandler(async (req, res) => {
      const orders = await db.orders.findAll({
      include:[{
          model: db.orderdetail
      }],
      where:{
          idUser: req.user.id
      },
    }
  )
  res.send(orders)
}));
  
  module.exports = orderRouter; 