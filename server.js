const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Change this to the desired port


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/build')); // Replace 'path_to_your_index_html_file' with the actual path to your HTML file
//   });



// Serve static files from the client directory
if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, 'client/build')));
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
