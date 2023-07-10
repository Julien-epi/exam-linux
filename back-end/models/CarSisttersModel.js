const mongoose = require("mongoose");

const CarSisttersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  }
});


module.exports = mongoose.model("CarSistters", CarSisttersSchema);
