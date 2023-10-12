const express = require('express');
const path = require('path');

const pathDir = require('../util/path');
const route = express.Router();

route.get('/', (req, res) => {
  res.sendFile(path.join(pathDir, 'views', 'shop.html'));
});
route.use((req, res, next) => {
  res.status(404).sendFile(path.join(pathDir, 'views', '404.html'));
});

module.exports = route;
