CREATE DATABASE reviewsystem;

USE reviewsystem;
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  user_id INT,
  rating INT,hospital
  review TEXT,
  UNIQUE KEY unique_review (product_id, user_id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
INSERT INTO products (name) VALUES ('Product A'), ('Product B'), ('Product C');