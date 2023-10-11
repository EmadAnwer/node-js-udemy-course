const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// body from a form
app.use(bodyParser.urlencoded({ extends: false }));
app.use('/add-product', (req, res, next) => {
  res.send(
    `<form action="/product" method="POST">
      <input type="text" name="title">
      <button type="submit">Add Product</button>
  </form>`
  );
});

app.post('/product', (req, res, next) => {
  console.log(req.body);
  res.send(`<h1>${req.body['title']}</h1>`);
});
app.get('/', (req, res) => {
  res.send(`<h1>Hello, this is the root route</h1>`);
});
app.use((req, res, next) => {
  res.status(404).send('<h1>404 - Not Found</h1>');
});

app.listen(3000);
