const express = require('express');
const path = require('path');

const route = express.Router();
const pathDir = require('../util/path');

route.get('/', (req, res) => {
  res.sendFile(path.join(pathDir, 'views', 'shop.html'));
});
route.use((req, res, next) => {
  res.status(404).sendFile(path.join(pathDir, 'views', 'not-found_404.html'));
});

module.exports = route;
