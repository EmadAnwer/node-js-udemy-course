const http = require('http');

const express = require('express');
const app = express();

app.use('/users', (req, res, next) => {
  res.send('<h1>Hello This Users page</h1>');
  console.log('middleware 1');
  next();
});
app.get('/', (req, res) => {
  res.send(`<h1>Hello, this is the root route</h1>`);
});
app.use((req, res, next) => {
  res.status(404).send('<h1>404 - Not Found</h1>');
});

app.listen(3000);
