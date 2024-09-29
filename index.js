const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Example route to fetch data (replace this with your API call)
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello, your server is working!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
