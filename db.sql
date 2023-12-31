-- Create the designher database
CREATE DATABASE designher;

-- Switch to the designher database
\c designher;

-- Create the users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email_address VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

-- Create the crocs table with product_price column
CREATE TABLE crocs (
    product_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100),
    image_path VARCHAR(255),
    description TEXT,
    product_type VARCHAR(100),
    product_price DECIMAL(10, 2) -- Example: (Total digits, Digits after decimal point)
);

-- Create the jackets table with product_price column
CREATE TABLE jackets (
    product_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100),
    image_path VARCHAR(255),
    description TEXT,
    product_type VARCHAR(100),
    product_price DECIMAL(10, 2)
);

-- Create the sneakers table with product_price column
CREATE TABLE sneakers (
    product_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100),
    image_path VARCHAR(255),
    description TEXT,
    product_type VARCHAR(100),
    product_price DECIMAL(10, 2)
);

-- Create the boots table with product_price column
CREATE TABLE boots (
    product_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100),
    image_path VARCHAR(255),
    description TEXT,
    product_type VARCHAR(100),
    product_price DECIMAL(10, 2)
);


-- Create the orders table
CREATE TABLE orders (
    order_number UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id INTEGER REFERENCES users(user_id),
    order_date DATE DEFAULT CURRENT_DATE
);

-- Create the order_items table
CREATE TABLE order_items (
    order_id INTEGER REFERENCES orders(order_number),
    product_id VARCHAR(36) REFERENCES (
        SELECT product_id FROM crocs 
        UNION SELECT product_id FROM jackets 
        UNION SELECT product_id FROM sneakers 
        UNION SELECT product_id FROM boots
    )
);
