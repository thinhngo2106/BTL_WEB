const  multer = require('multer');
const express = require ('express');
const { isAdmin, isAuth} = require('../utlis');

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: '../Front-end/public/image/Product/',
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

uploadRouter.post('/', isAuth,
    upload.single('image'), (req, res) => {
    res.send(`${req.file.path}`);
});

module.exports = uploadRouter;