CREATE DATABASE bamazon;

USE bamazon;


CREATE TABLE products(
item_id INT AUTO_INCREMENT NOT NULL, 
department_name VARCHAR (20),
product_name VARCHAR(100),
price DECIMAL(10,2) NOT NULL ,
stock_quantity INT NOT NULL, 
PRIMARY KEY(item_id) 
);


INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("hygene", "Toothpaste", 2, 36);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Cell phones", "Iphone X", 1000, 10);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("appliances", "dishwasher", 99.99, 12);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("entertainment", "Sony 55in OLED", 469.99, 10);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("outdoor equipment", "soccer ball", 45, 12);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("hygene", "hairspray", 1.99, 522);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("hygene", "perfume", 2.99, 20);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Cell phones", "Samsung s9", 600, 2);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("appliances", "wall charger", 3, 11);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("appliances", "toaster", 90, 1);
