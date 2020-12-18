const express = require("express");
const db = require('../models');
const router = express.Router();
const expressAsyncHandler =  require('express-async-handler');
const data = require("../dataimport");
const productController = require('../controllers/productController');
const { isAdmin, isAuth} = require('../utlis');

router.get("/categories", 
expressAsyncHandler(async (req, res) => {
    const categories = await db.categories.findAll();
    res.send(categories);

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


router.get('/', productController.products);
router.get("/seed", productController.postProducts);    
router.get('/:id',productController.productdetail);






module.exports = router;