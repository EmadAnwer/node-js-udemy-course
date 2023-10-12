const express = require('express');
const path = require('path');

const pathDir = require('../util/path');
const route = express.Router();

// old way path.join(__dirname, '../', 'views', 'add-product.html')
route.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(pathDir, 'views', 'add-product.html'));
});

route.post('/product', (req, res, next) => {
  console.log(req.body);
  res.send(`<h1>${req.body['title']}</h1>`);
});

module.exports = route;
