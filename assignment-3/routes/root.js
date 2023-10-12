const express = require('express');
const path = require('path');

const pathDir = require('../util/path');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(pathDir, 'views', 'home.html'));
});

module.exports = router;
