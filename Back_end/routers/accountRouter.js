const express = require("express");
const db = require('../models');
const router = express.Router();

router.get("/users", (req,res)=>{
    db.users.findAll().then(users => res.send(users));
});

module.exports = router;