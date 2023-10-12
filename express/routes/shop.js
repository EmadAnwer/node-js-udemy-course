const express = require('express');

const route = express.Router();

route.get('/', (req, res) => {
  res.send(`<h1>Hello, this is the root route</h1>`);
});
route.use((req, res, next) => {
  res.status(404).send('<h1>404 - Not Found</h1>');
});

module.exports = route;
