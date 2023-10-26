// src/server.js

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Import the API routes defined in api.js
const apiRoutes = require('./routes/api');

// Use the API routes
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
