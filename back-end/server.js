const express = require("express");
const mongoose = require("mongoose"); // Ajoutez ceci si vous utilisez Mongoose
const app = express();
const port = 3000;

// Connectez-vous à la base de données
mongoose
  .connect("mongodb://db:27017/dblinux", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
