const moongoose = require("mongoose");
const config = require("./config");
// Middlewares

// Database Connect
const {
  db: { host, port, name },
} = config;
const connnectionString = `mongodb://${host}:${port}/${name}`;
moongoose
  .connect(connnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));
