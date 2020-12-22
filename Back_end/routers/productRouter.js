const express = require("express");
const db = require('../models');
const router = express.Router();
const expressAsyncHandler =  require('express-async-handler');
const data = require("../dataimport");
const productController = require('../controllers/productController');
const { isAdmin, isAuth} = require('../utlis');
const { route } = require("./uploadRouter");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;



router.get("/categories", 
expressAsyncHandler(async (req, res) => {
    const categories = await db.categories.findAll();
    res.send(categories);

}));
router.get("/brands", 
expressAsyncHandler(async (req, res) => {
    const brands = await db.brands.findAll();
    res.send(brands);

}));

router.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = await db.products.findOne({
            where:{
                idProduct: req.params.id
            }
        })
        if (product) {
        const deleteProduct = await product.destroy();
        res.send({ message: 'Product Deleted', product: deleteProduct });
        } else {
        res.status(404).send({ message: 'Product Not Found' });
        }
  })
);

router.post("/",
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const createdProduct = await db.products.create({
            productName: req.body.name,
            productPrice: req.body.price,
            productDescription:"ss",
            quantityInStock: req.body.quantityInStock,
            idBrand: req.body.brand,
            idCategory: req.body.category,
        });
        const createdetail = await db.productdetail.create({
            idProduct: createdProduct.idProduct,
            image: req.body.image,
        })
        res.send({ message: 'Product Created', product: createdProduct });
    }
));


router.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) =>{
        const productId = req.params.id;
        const product = await db.products.findOne({
            where:{
                idProduct: productId
            }
        })
        const productImage = await db.productdetail.findOne({
            where:[{
                idProduct: productId,
                idImage: 1
            }],
        })
        const productSize = await db.productsizes.findOne({
            where:[{
                idProduct: productId,
                idSize: req.body.size,
            }]
        })
        if (product) {
            product.productName = req.body.name;
            product.productPrice = req.body.price;
            product.productDescription = req.body.description;
            product.idBrand = req.body.brand;
            product.idCategory = req.body.category;
            await product.save();
        } 
        
        if (productImage) {
            productImage.image = req.body.image;
            await productImage.save();
        }
        const count = req.body.qty;
        const quantity = parseInt(count)
        if (productSize) {
            productSize.quantityInStock = quantity;
            await productSize.save();
        }
        if(product){
        res.send({ message: 'Product Updated'});}
        else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })

);

router.get("/test",
    expressAsyncHandler(async (req, res) => {
        const min = req.query.min;
        const minPrice = parseInt(min);
        const max = req.query.max;
        const maxPrice = parseInt(max);
        const priceFilter = min && max ? [min,max] : [1,50000000];
        const product = await db.products.findAll({
            where:{
                productPrice: {[Op.between]: priceFilter}
            }
        })
        res.send({product});
    }));
   



router.get('/', productController.products);
router.get("/seed", productController.postProducts);    
router.get('/:id',productController.productdetail);






module.exports = router;