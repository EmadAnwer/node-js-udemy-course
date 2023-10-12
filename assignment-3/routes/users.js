const express = require('express');
const path = require('path');

const pathDir = require('../util/path');
const router = express.Router();

router.get('/users', (req, res, next) => {
  res.sendFile(path.join(pathDir, 'views', 'users.html'));
});

module.exports = router;
