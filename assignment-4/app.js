// entry point
const express = require('express');

const usersData = require('./routers/users');
const rootRouter = require('./routers/root');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(usersData.router);
app.use(rootRouter);
app.use((req, res) => {
  res.status(404).render('404', {pageTitle: '404'});
});

app.listen(4000);
