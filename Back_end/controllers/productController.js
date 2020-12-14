const db = require('../models');
const expressAsyncHandler =  require('express-async-handler');
const data = require("../dataimport");


module.exports.productdetail = expressAsyncHandler(async( req,res) => {
    const product = await db.products.findOne({
        include:[{
            model: db.productdetail
        },
        {
            model: db.productsizes
        }],
        where:{
            idProduct: req.params.id
        }
    })
    if (product){
        res.send(product)
    }
    else {
        res.status(404).send({message: 'Không tìm thấy sản phẩm'})
    }
});

module.exports.products =  expressAsyncHandler(async(req,res)=>{
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const category = req.query.category || '';
    const order = req.query.order || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};    


    const products = await db.products.findAll({
        where:{
            ...nameFilter,
            ...categoryFilter,

        },
        include: [
            {
                model: db.productdetail
            }
        ]
    })
    res.send(products);
});

module.exports.postProducts =  expressAsyncHandler(async (req, res) => {
    const createc =  await db.categories.bulkCreate(data.categories);
    const createb =   await db.brands.bulkCreate(data.brands);
    const createpd = await db.products.bulkCreate(data.products);
    const createp =   await db.productdetail.bulkCreate(data.productdetail);
    const createps = await db.productsizes.bulkCreate(data.productsizes)
    res.send({createc, createb, createp,createpd});

    
});