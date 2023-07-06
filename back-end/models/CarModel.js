const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  immat: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Car", CarSchema);
