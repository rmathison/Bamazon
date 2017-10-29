



DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;
CREATE TABLE products (
item_id INT(20) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(80) NOT NULL,
department_name VARCHAR(80) DEFAULT NULL,
price DECIMAL (10, 2) DEFAULT NULL,
stock_quantity INT(50) DEFAULT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Snowboard", "Ski", 500.50, 20 ),
(2, "Goggles", "Ski", 60.99, 50),
(3, "Gloves", "Ski", 45.50, 40),
(4, "Helmet", "Ski", 120, 30),
(5, "Ski Pants", "Clothing", 80, 35),
(6, "Ski Jacket", "Clothing", 150, 30),
(7, "Snowboard Bindings","Ski", 120.25, 56),
(8, "Sun Glasses", "Ski", 80, 56),
(9, "Sun Screen", "Sundries", 10, 69),
(10, "Long Johns", "Clothing", 20, 40);
