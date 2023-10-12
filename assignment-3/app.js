const express = require('express');
const path = require('path');

const rootRouter = require('./routes/root');
const usersRouter = require('./routes/users');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(rootRouter);
app.use(usersRouter);
app.use((req, res, next) => {
  res.sendStatus(404).sendDate('<h1>404</h1>');
});
app.listen(4000);
