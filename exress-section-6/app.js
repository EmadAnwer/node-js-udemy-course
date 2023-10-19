const path = require('path');

const express = require('express');

const app = express();

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.router);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: '404', path: '' });
});

app.listen(3000);
