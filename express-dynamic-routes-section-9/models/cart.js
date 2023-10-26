const fs = require('fs');
const path = require('path');
const Product = require('./product');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, price) {
    // load Cart
    fs.readFile(p, (error, data) => {
      let cart = { products: [], totalPrice: 0 };
      if (!error) {
        cart = JSON.parse(data);
      }
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProdcut;
      if (existingProduct) {
        updatedProdcut = { ...existingProduct };
        updatedProdcut.qty = updatedProdcut.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProdcut;
      } else {
        updatedProdcut = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProdcut];
      }
      cart.totalPrice = cart.totalPrice + +price;

      fs.writeFile(p, JSON.stringify(cart), (error) => {
        console.log(error);
      });
    });
  }

  static deleteByID(id, price, cb) {
    fs.readFile(p, (error, data) => {
      if (error) {
        return cb();
      }

      const cart = JSON.parse(data);
      const updatedCart = { ...cart };

      const productToDeleteIndex = updatedCart.products.findIndex(
        (prod) => prod.id === id
      );
      if (productToDeleteIndex === -1) {
        return cb();
      }
      updatedCart.totalPrice =
        updatedCart.totalPrice -
        price * updatedCart.products[productToDeleteIndex].qty;
      updatedCart.products.splice(productToDeleteIndex, 1);
      cb(
        fs.writeFile(p, JSON.stringify(updatedCart), (error) => {
          console.log(error);
        })
      );
    });
  }

  static getProducts(cb) {
    fs.readFile(p, (error, data) => {
      if (error) {
        return cb([]);
      }

      return cb(JSON.parse(data).products);
    });
  }
};
