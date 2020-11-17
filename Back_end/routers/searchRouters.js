const express = require("express");
const db = require('../models');
const router = express.Router();
const expressAsyncHandler =  require('express-async-handler');
const data = require("../dataimport");
const productController = require('../controllers/productController');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', expressAsyncHandler(async( req,res) => {
    const term = req.query.query;
    const products = await db.products.findAll({
        include:[{
            model: db.productdetail
        }],
        where:{
            productName:  {[Op.like]: '%'+ term+'%'}
        }
    })
    if (products.length > 0) {
            res.send(products)
    }
    else {
        
        res.status(404).send({message: 'Không tìm thấy sản phẩm', term})
    }
}));

module.exports = router;