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
router.post(
    "/register",
    expressAsyncHandler(async (req, res) => {
      const check = await db.users.findOne({  
            where: {
                userEmail: req.body.email,
        }
    })  
    if(check){
        res.send({message: "Tài khoản đã được sử dụng"})
    }
    else{
      const user = await db.users.create({
        userFname: req.body.fname,
        userLname: req.body.lname,
        userEmail: req.body.email,
        userPassword: bcrypt.hashSync(req.body.password, 8),
      });
      res.send({
        id: user.idUser,
        Fname: user.userFname,
        Lname: user.userLname,
        email: user.userEmail,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    }
    })
  );

module.exports = router;