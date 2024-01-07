const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Change this to the desired port
// const { Pool } = require('pg');
const pool = require('./db');
const cors = require('cors');



app.use(cors());

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/build')); // Replace 'path_to_your_index_html_file' with the actual path to your HTML file
//   });



// Serve static files from the client directory
if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, 'client/build')));
}


// the routes will inlcude


//all products
app.get('/allProducts', async(req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products'); // Replace 'products' with your table name
    const products = result.rows;
    res.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// all customers
app.get('/allCustomers', async(req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users'); // Replace 'customers' with your table name
    const customers = result.rows;
    res.json({ customers });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// all crocs
app.get('/allCrocs', async(req, res) => {
  try {
    const result = await pool.query('SELECT * FROM crocs'); // Replace 'customers' with your table name
    const crocs = result.rows;
    res.json({ crocs });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// all jackets
app.get('/allJackets', async(req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jackets'); // Replace 'customers' with your table name
    const jackets = result.rows;
    res.json({ jackets });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// all sneakers
app.get('/allSneakers', async(req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sneakers'); // Replace 'customers' with your table name
    const sneakers = result.rows;
    res.json({ sneakers });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// all boots
app.get('/allBoots', async(req, res) => {
  try {
    const result = await pool.query('SELECT * FROM boots'); // Replace 'customers' with your table name
    const boots = result.rows;
    res.json({ boots });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// get item
app.get('/item/{$item_number}', (req, res) => {

})

//get order
app.get('/order/{$order_number}', (req, res) => {

})

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
