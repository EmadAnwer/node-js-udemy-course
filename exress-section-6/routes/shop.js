const path = require('path');

const express = require('express');

const adminData = require('./admin');
const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
  // console.log('products form shop', adminData.products);
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  console.log('products form shop', adminData.products);
  res.render('shop', {
    prods: adminData.products,
    pageTitle: 'Shop',
    path: '/',
  });
});

module.exports = router;
