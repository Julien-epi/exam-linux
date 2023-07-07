const mongoose = require('mongoose');
const config = require('./config');

const { db: { host, port, name }} = config;
const connnectionString = `mongodb://${host}:${port}/${name}`;

mongoose
.connect(connnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Successfully connected to MongoDB"))
.catch((err) => {
        console.log("🚀 ~ file: database.js:7 ~ connnectionString:", connnectionString)
        console.error("Failed to connect to MongoDB", err);
        process.exit();
    });
