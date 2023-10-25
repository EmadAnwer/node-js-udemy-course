const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      try {
        cb(JSON.parse(fileContent));
      } catch (error) {
        cb([]);
      }
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const updatedProductInex = products.findIndex(
          (prod) => this.id === prod.id
        );
        const newProductUpdatedList = [...products];
        newProductUpdatedList[updatedProductInex] = this;
        fs.writeFile(p, JSON.stringify(newProductUpdatedList), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteByID(id, cb) {
    getProductsFromFile((products) => {
      const index = products.findIndex((p) => id === p.id);
      const updatedProduct = [...products];
      Cart.deleteByID(id, updatedProduct[index].price, () => {
        updatedProduct.splice(index, 1);
        cb(
          fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
            console.log(err);
          })
        );
      });
    });
  }
  static findByID(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id == id);
      cb(product);
    });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
