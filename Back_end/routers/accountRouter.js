const express = require("express");
const db = require('../models');
const router = express.Router();
const data = require('../dataimport');
const expressAsyncHandler =  require('express-async-handler');
const bcrypt = require('bcryptjs');
const {generateToken} = require('../utlis');
const userController = require('../controllers/accountController');



router.get("/users", (req,res)=>{
    db.users.findAll().then(users => res.send(users));
});
router.get("/seed",userController.seed);

router.post("/signin", userController.singin)

router.post("/check", (req,res)=>{
    res.send(req.body);
});

module.exports = router;