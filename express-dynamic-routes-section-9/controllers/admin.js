const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    edit: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save(() => {
    res.redirect('/');
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit === 'true';
  if (!editMode) {
    res.redirect('/');
  }
  const prodcutId = req.params.productId;

  Product.findByID(prodcutId, (product) => {
    if (!product) {
      res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      edit: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  console.log(productId);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const updatedProduct = new Product(
    productId,
    title,
    imageUrl,
    description,
    price
  );
  updatedProduct.save();
  res.redirect('/');
};

exports.postDeleteProduct = (req, res, next) => {
  const deleteMode = req.query.delete === 'true';
  if (deleteMode) {
    const productId = req.body.productId;
    Product.deleteByID(productId, () => {
      res.redirect('/admin/products');
    });
  } else {
    res.redirect('/admin/products');
  }
};
