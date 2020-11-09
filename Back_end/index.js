const express = require('express')
const app = express()
const port = 4000
const mysql = require('mysql');
const data = require('./data');
const db = require('./models')
const bodyParser = require('body-parser');

app.get('/api/products/:id', (req,res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  }else{
    res.status(404).send({ message: 'Product not found'});
  }
});

app.get('/api/products', (req, res) => {
  res.send(data.products)
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.urlencoded({extends: true}));
app.use(express.json());

const apiRoutes = require("./routers/accountRouter");
app.use('/api', apiRoutes);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
});
