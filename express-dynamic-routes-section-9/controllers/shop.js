const Product = require('../models/product');
const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByID(productId, (product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products',
    });
  });
};
exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getProducts((cartProductsWithoutData) => {
    console.log(cartProductsWithoutData);
    Product.fetchAll((products) => {
      const prods = [];
      if (products.length > 0) {
        for (const product of cartProductsWithoutData) {
          const productData = products.find((p) => p.id === product.id);
          prods.push({ data: productData, qty: product.qty });
        }
      }
      console.log(prods);
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: prods,
      });
    });
  });
};
exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByID(productId, (prod) => {
    Cart.addProduct(prod.id, prod.price);
  });

  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};

exports.postDeleteCartItem = (req, res, next) => {
  const productId = req.body.productId;
  console.log(productId);
  Product.findByID(productId, (product) => {
    Cart.deleteByID(product.id, product.price, () => {
      res.redirect('/cart');
    });
  });
};
