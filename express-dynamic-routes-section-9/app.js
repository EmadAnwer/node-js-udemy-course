const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./util/db');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
db.execute('SELECT * from products where id = ?',[3], (error, results)=>{
	if (error){
		console.log(error);
	}
	else{
		console.log(results);
	}
})

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
