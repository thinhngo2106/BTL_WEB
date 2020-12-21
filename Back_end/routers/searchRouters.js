const express = require("express");
const db = require('../models');
const router = express.Router();
const expressAsyncHandler =  require('express-async-handler');

const productController = require('../controllers/productController');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', expressAsyncHandler(async( req,res) => {
    const term = req.query.query + "*";
    const products = await db.products.findAll({
        include:[{
            model: db.productdetail
        }],
        where:
            Sequelize.literal('MATCH (productName) AGAINST (:name IN BOOLEAN MODE) ')
        ,
        replacements: {
            name: term
        }
    })
    if (products.length > 0) {
            res.send(products)
    }
    else {  
        res.status(404).send({message: 'Không tìm thấy sản phẩm', term})
    }
}));






router.get('/categories', 
    expressAsyncHandler(async (req, res) => {
    const term = req.query.name;
    const page = req.query.page >= 0 ? req.query.page : 0;
    const min = req.query.min;
    const minPrice = parseInt(min);
    const max = req.query.max;
    const maxPrice = parseInt(max);
    const limitProduct = req.query.limit
    const limit =  parseInt(limitProduct); 
    const offset = page ? parseInt(page * limit) : 0;
 
    const priceFilter = minPrice && maxPrice ? [minPrice,maxPrice] : [1,50000000];
    const data = await db.categories.findAll({
        where:{
           categoryName : req.query.name,
        },
        include:[{
            model: db.products,

            include:[{
                model: db.productdetail,
                required: true,
                offset: 0,
                limit: 1,
            }],
            offset: offset,
            limit: limit,
            where:{
                productPrice: {[Op.between]: priceFilter}
            },
 
        }],

    })
    const pages = await db.categories.count({
        where:{
            categoryName : req.query.name
        },
        include: [{
            model: db.products,
            where:{
                productPrice: {[Op.between]: priceFilter}
            },
            attributes: []
        }],
    })  
    const totalPages = Math.ceil(pages/ limit);
    
    if (data){
        res.send({data, totalPages});
    }
    else {
        res.status(404).send({message: 'Không tìm thấy sản phẩm'})
}}));



router.get('/category', 
    expressAsyncHandler(async (req, res) => {
    const limitProduct = req.query.limit
    const limit = limitProduct ? parseInt(limitProduct) : 3; 
    const offset = 0;
    const data = await db.categories.findAll({
        include:[{
            model: db.products,
            include:[{
                model: db.productdetail,
                required: true
            }],
            offset: offset,
            limit: limit,
        }],

    })
    if (data){
        res.send({data});
    }
    else {
        res.status(404).send({message: 'Không tìm thấy sản phẩm'})
}}));




module.exports = router;