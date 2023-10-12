const path = require('path');

const express = require('express');

const app = express();
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRouter);
app.use(shopRouter);
app.listen(3000);
