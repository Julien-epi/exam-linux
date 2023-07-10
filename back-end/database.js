const mongoose = require('mongoose');
const config = require('./config');

const { db: { host, port, name }} = config;
const dockerEnv = process.env.DOCKER_ENV || false; 
const containerPort = process.env.MONGO_PORT_CONTAINER || process.env.MONGO_PORT;
const connectionString = dockerEnv ? `mongodb://db:${containerPort}/${name}` : `mongodb://${host}:${port}/${name}`;

mongoose
  .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => {
    console.log("🚀 ~ file: database.js:7 ~ connectionString:", connectionString)
    console.error("Failed to connect to MongoDB", err);
    process.exit();
  });
