const express = require("express");
const db = require('../models');
const router = express.Router();
const expressAsyncHandler =  require('express-async-handler');
const data = require("../dataimport");
const productController = require('../controllers/productController');
const { isAdmin, isAuth} = require('../utlis');
const { route } = require("./uploadRouter");

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


router.get('/', productController.products);
router.get("/seed", productController.postProducts);    
router.get('/:id',productController.productdetail);






module.exports = router;