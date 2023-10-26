CREATE DATABASE IF NOT EXISTS store;

CREATE USER IF NOT EXISTS 'node_user'@'localhost' IDENTIFIED BY 'node_user_password';
GRANT ALL PRIVILEGES ON store.* TO 'node_user'@'localhost';
FLUSH PRIVILEGES;

USE store;

CREATE TABLE IF NOT EXISTS products (
	id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255),
	imageUrl VARCHAR(255),
	description TEXT,
	price DOUBLE
);

INSERT INTO products (title, imageUrl, description, price) 
VALUES
  ('Book 1', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1435904946i/4643301.jpg', 'In Imager, the first book of the Imager Portfolio, we met Rhennthyl, an apprentice portrait artist whose life was changed by a disastrous fire. But the blaze that took his master€™s life and destroyed his livelihood revealed a secret power previously dormant in Rhenn; the power of imaging, the ability to shape matter using thought. ', 20.5);


CREATE TABLE  IF NOT EXISTS cart (
	productId INT PRIMARY KEY,
	quantity INT,
	FOREIGN KEY (productId) REFERENCES products(id)
);
