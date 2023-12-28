const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Change this to the desired port


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/public/index.html')); // Replace 'path_to_your_index_html_file' with the actual path to your HTML file
  });



// Serve static files from the client directory
// app.use(express.static(path.join(__dirname, '/client/public/index.html')));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
