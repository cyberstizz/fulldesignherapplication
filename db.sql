-- Create the designher database
CREATE DATABASE designher;

-- Switch to the designher database
\c designher;

-- Enable the uuid-ossp extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email_address VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

-- Create the crocs table with product_id as UUID
CREATE TABLE crocs (
    product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100),
    image_path VARCHAR(255),
    description TEXT,
    product_type VARCHAR(100),
    product_price DECIMAL(10, 2)
);

-- Create the jackets table with product_id as UUID
CREATE TABLE jackets (
    product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100),
    image_path VARCHAR(255),
    description TEXT,
    product_type VARCHAR(100),
    product_price DECIMAL(10, 2)
);

-- Create the sneakers table with product_id as UUID
CREATE TABLE sneakers (
    product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100),
    image_path VARCHAR(255),
    description TEXT,
    product_type VARCHAR(100),
    product_price DECIMAL(10, 2)
);

-- Create the boots table with product_id as UUID
CREATE TABLE boots (
    product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
    order_id UUID REFERENCES orders(order_number),
    product_id UUID REFERENCES (
        SELECT product_id FROM crocs 
        UNION SELECT product_id FROM jackets 
        UNION SELECT product_id FROM sneakers 
        UNION SELECT product_id FROM boots
    )
);
