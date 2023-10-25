const fs = require('fs');
const path = require('path');

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
};
