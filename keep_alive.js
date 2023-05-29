const express = require('express');
const app = express();

// Basic endpoint to check if the server is running
app.get('/', (req, res) => {
  res.send('Bot is running.');
});

// Start the server
const startServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
};

module.exports = startServer;
