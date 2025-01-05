const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Adjust if your routes are in a different location

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/users', userRoutes);

module.exports = app;
