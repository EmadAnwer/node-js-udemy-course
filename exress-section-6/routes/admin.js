const path = require('path');

const express = require('express');

const productsController = require('../controllers/prouducts');

const router = express.Router();

const products = [];
// /admin/add-product => GET
router.get('/add-product', productsController.getAddProductsPage);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProudcts);

module.exports = router;
