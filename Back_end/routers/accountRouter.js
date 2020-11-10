const express = require("express");
const db = require('../models');
const router = express.Router();
const data = require('../dataimport');
const expressAsyncHandler =  require('express-async-handler');

router.get("/users", (req,res)=>{
    db.users.findAll().then(users => res.send(users));
});
router.get("/seed", expressAsyncHandler(async (req, res) => {
    const create = await db.users.bulkCreate(data.users);
    res.send({create});
    })
);


module.exports = router;