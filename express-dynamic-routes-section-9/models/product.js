const Cart = require('./cart');
const db = require('../util/db');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save(cb) {
    db.execute(
      'INSERT INTO products (title, imageUrl, description, price) VALUES (?, ?, ?, ?)',
      [this.title, this.imageUrl, this.description, this.price],
      (err, result) => {}
    );
  }

  static deleteByID(id, cb) {
    db.execute('DELETE FROM products WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.log(err);
      }
      return cb();
    });
  }
  static findByID(id, cb) {
    db.execute('SELECT * FROM products where id = ?', [id], (err, result) => {
      if (err) {
        console.log(err);
        return cb([]);
      } else if (result.length > 0) {
        return cb(result[0]);
      } else {
        return cb([]);
      }
    });
  }
  static fetchAll(cb) {
    db.execute('SELECT * FROM products', (err, result) => {
      if (err) {
        console.log(err);
        return cb([]);
      }

      return cb(result);
    });
  }
};
