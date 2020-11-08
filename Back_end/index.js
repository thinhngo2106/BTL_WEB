const express = require('express')
const app = express()
const port = 4000
const mysql = require('mysql');
const data = require('./data');


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

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "010820",
  database: "projectweb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})