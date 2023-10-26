const mysql = require('mysql2');

module.exports = mysql.createPool({
  host: 'localhost',
  database: 'store',
  user: 'node_user',
  password: 'node_user_password',
});
