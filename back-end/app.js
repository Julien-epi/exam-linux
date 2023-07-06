const express = require('express');
const app = require('express')();
const db = require('./database');
const config = require('./config');

// getting port info from config
const { app: { port }} = config;

// parsing information
app.use(express.json()); 

// Routes
app.use('/api/user', require('./router/userRoutes'));
app.use('/api/car', require('./router/carRoutes'));
app.use('/api/planning', require('./router/planningRoutes'));
// Server to connect and listen
app.listen(port)

module.exports = app;