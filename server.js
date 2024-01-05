const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Change this to the desired port

const Pool = require('./db');



// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/build')); // Replace 'path_to_your_index_html_file' with the actual path to your HTML file
//   });



// Serve static files from the client directory
if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, 'client/build')));
}


// the routes will inlcude


//all products
app.get('/allProducts', (req, res) => {

})

// all customers

// all crocs

// all jackets

// all sneakers

// all boots

// get item

//get order


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
