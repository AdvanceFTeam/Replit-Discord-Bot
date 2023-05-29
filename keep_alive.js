const express = require('express');
const app = express();

// Endpoint to check if the server is running
app.get('/', (req, res) => {
  res.send('Bot is running.');
});

// Function to start the server
const startServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
};

// Export the function to start the server
module.exports = startServer;
