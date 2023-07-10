const mongoose = require("mongoose");

const PlanningSchema = new mongoose.Schema({
  carsitterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CarSistters",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Planning", PlanningSchema);

