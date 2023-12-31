const Planning = require("../models/PlanningModel");

// Function to create a planning slot
exports.createSlot = (req, res) => {
  const { carsitterId, startTime, endTime } = req.body;

  // Validate user input
  if (!(carsitterId && startTime && endTime)) {
    return res.status(400).send("All input is required");
  }

  // Create a new planning slot
  const newSlot = new Planning({ carsitterId, startTime, endTime });
  newSlot
    .save()
    .then(() => res.status(200).json({ msg: "Planning slot created" }))
    .catch((err) => res.status(500).send(err.message));
};

// Function to update a planning slot
exports.updateSlot = (req, res) => {
  const { id } = req.params;
  const { carsitterId, startTime, endTime } = req.body;

  Planning.findByIdAndUpdate(
    id,
    { carsitterId, startTime, endTime },
    { new: true }
  )
    .then(() => res.status(200).send("Update successful"))
    .catch((err) => res.status(500).send(err.message));
};

// Function to delete a planning slot
exports.deleteSlot = (req, res) => {
  const { id } = req.params;

  Planning.findByIdAndRemove(id)
    .then(() => res.status(200).send("Planning slot deleted successfully"))
    .catch((err) => res.status(500).send(err.message));
};

// Function to get all planning slots
exports.getAllSlots = (req, res) => {
  Planning.find({})
    .populate("carsitterId")
    .then((slots) => {
      res.status(200).json(slots);
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};

// Function to get a specific planning slot
exports.getSlotById = (req, res) => {
  const { id } = req.params;

  Planning.findById(id)
    .populate("carsitterId")
    .then((slot) => {
      if (slot) {
        res.status(200).json(slot);
      } else {
        res.status(404).send("Planning slot not found");
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send("Planning slot not found");
      } else {
        res.status(500).send("Error retrieving planning slot");
      }
    });
};
