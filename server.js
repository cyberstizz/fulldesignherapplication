const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // Change this to the desired port

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, 'client')));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
