const express = require("express");
const db = require('../models');
const orderRouter = express.Router();
const expressAsyncHandler =  require('express-async-handler');
const {isAuth, isAdmin} = require('../utlis');

orderRouter.post(  '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
      } else {
        const order = await db.orders.create({
          customerName: req.body.customerName,
          orderDate: req.body.orderDate,
          status: req.body.status,
          phoneNumber: req.body.phoneNumber,
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
              sizeProduct: element.size,
            })
        });

      }
      }
  )
);
orderRouter.get(
    '/mine',
    isAuth,
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

orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await db.orders.findAll({
    include:[{
        model: db.orderdetail
    },{
      model: db.users
    }
  ],
  }
)
res.send(orders)
}));

orderRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
      const today = new Date();
      const orderId = req.params.id
      dateShip = today.getFullYear() +'-'+ (today.getMonth()+1)+'-'+(today.getDate());
      const order = await db.orders.findOne({
        where: {
          idOrder: orderId
        }
      }
  )
      order.status = "Đã hoàn thành";
      order.shippedDate = dateShip;
      order.save();
  res.send(order)
}));





module.exports = orderRouter; 