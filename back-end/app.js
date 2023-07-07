require('dotenv').config();
const express = require('express');
const app = express();
const config = require('./config');

// Database connection
require('./database');

const { app: { port }} = config;

// parsing information
app.use(express.json());

// Routes
app.use('/api/car', require('./router/carRoutes'));
app.use('/api/planning', require('./router/planningRoutes'));

// Server to connect and listen
app.listen(port, () => {
    console.log(`Server is up and running on port number ${port}`);
})

module.exports = app;
