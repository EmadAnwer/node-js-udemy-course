const express = require('express');

const app = express();

// app.use((req, res, next) => {
//   console.log('meddleware 1');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('meddleware 2');
// });

app.use('/users', (req, res, next) => {
  res.send('<h1>Users Page</h1>');
});

app.use('/', (req, res, next) => {
  res.send('<h1>Root or anything instad of users</h1>');
});
app.listen(4000);
