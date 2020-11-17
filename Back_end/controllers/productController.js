const db = require('../models');
const expressAsyncHandler =  require('express-async-handler');
const data = require("../dataimport");


module.exports.productdetail = expressAsyncHandler(async( req,res) => {
    const product = await db.products.findOne({
        include:[{
            model: db.productdetail
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
    const products = await db.products.findAll({
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
    res.send({createc, createb, createp,createpd});

    
});