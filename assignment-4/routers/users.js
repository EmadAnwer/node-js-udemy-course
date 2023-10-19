const express = require('express');

const router = express.Router();

const users = [];
router.get('/users', (req, res) => {
  res.render('users', { pageTitle: 'Users' });
});

router.post('/users', (req, res) => {
  users.push(req.body);
  console.log(users);
  // users.push();
  res.redirect('/');
});
exports.router = router;
exports.users = users;
