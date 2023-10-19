const express = require('express');

const usersData = require('./users');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('root', { pageTitle: 'root', users: usersData.users });
});

module.exports = router;
