const Product = require('../models/product');

exports.getAddProductsPage = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};
exports.postAddProudcts = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};
exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.render('shop', {
    prods: products,
    hasProducts: products.length > 0,
    pageTitle: 'Shop',
    activeShop: true,
    productCSS: true,
    path: '/',
  });
};
