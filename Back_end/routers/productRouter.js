const express = require("express");
const db = require('../models');
const router = express.Router();
const expressAsyncHandler =  require('express-async-handler');
const data = require("../dataimport");
const productController = require('../controllers/productController');



router.get("/categories", 
expressAsyncHandler(async (req, res) => {
    const categories = await db.categories.findAll();
    res.send(categories);

}));
router.get('/', productController.products);
router.get("/seed", productController.postProducts);    
router.get('/:id',productController.productdetail);






module.exports = router;