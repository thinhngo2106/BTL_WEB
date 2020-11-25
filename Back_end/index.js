const express = require('express')
const app = express()
const port = 4000
const mysql = require('mysql');
const data = require('./data');
const db = require('./models')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
const productRouter = require("./routers/productRouter");
app.use('/api/products', productRouter);

const userRouter = require("./routers/accountRouter");


app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const searchRouter = require("./routers/searchRouters");
app.use('/api/search', searchRouter);
const orderRouter = require("./routers/orderRouter");
app.use('/api/orders',orderRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
});
