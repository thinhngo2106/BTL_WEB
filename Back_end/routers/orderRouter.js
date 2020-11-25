const express = require("express");
const db = require('../models');
const orderRouter = express.Router();
const expressAsyncHandler =  require('express-async-handler');
const { isAdmin, isAuth} = require('../utlis');

orderRouter.post(  '/',
    expressAsyncHandler(async (req, res) => {
        const order = await db.orders.create({
          orderDate: req.body.orderDate,
          status: req.body.status,
          shippedDate: req.body.shippedDate,
          address: req.body.shippingAddress,
          paymentMethod: req.body.paymentMethod,
          shippingPrice: req.body.shippingPrice,
          idUser: req.user.idUser,
        });
        const array = req.body.orderItems;
        array.forEach(async(element) => {
            await db.orderdetail.create({
              idOrder: order.idOrder,
              idProduct: element.id,
              priceEach: element.priceEach,
              quantityOrder: element.quantityOrder,
            })
        });
        res.send({order});
      }
)
  );
  
  module.exports = orderRouter; 