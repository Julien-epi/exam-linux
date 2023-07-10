const CarSistters = require("../models/CarSisttersModel");

exports.carSisttersRegister = (req, res) => {
  const { firstname, lastname, contactInfo } = req.body;

  if (!(firstname && lastname && contactInfo)) {
    return res.status(400).send("All input is required");
  }

  // Create a new CarSistters
  const newCarSistters = new CarSistters({
    firstname,
    lastname,
    contactInfo,
  });
  newCarSistters
    .save()
    .then(() => res.status(200).json({ msg: "CarSistters created" }))
    .catch((err) => res.status(500).send(err.message));
};

// Function to update a CarSistters
exports.carSisttersUpdate = (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, contactInfo } = req.body;

  CarSistters.findOneAndUpdate(
    { _id: id },
    { firstname, lastname, contactInfo},
    { new: true }
  )
    .then(() => res.status(200).send("Update successful"))
    .catch((err) => res.status(500).send(err.message));
};

// Function to delete a CarSistters
exports.carSisttersDelete = (req, res) => {
  const { id } = req.params;

  CarSistters.findOneAndRemove({ _id: id })
    .then(() => res.status(200).send("CarSistters deleted successfully"))
    .catch((err) => res.status(500).send(err.message));
};

// Function to get CarSistters info
exports.carSisttersInfos = (req, res) => {
  const { id } = req.params;

  CarSistters.findById(id)
    .then((car) => {
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).send("CarSistters not found");
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send("CarSistters not found");
      } else {
        res.status(500).send("Error retrieving car");
      }
    });
};

// Function to get all CarSistters
exports.getAllCarSistters = (req, res) => {
  CarSistters.find({})
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};

// Function to get a CarSistters by ID
exports.getCarSisttersById = (req, res) => {
  CarSistters.findById(req.params.id)
    .then((car) => {
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).send("CarSistters not found");
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send("CarSistters not found");
      } else {
        res.status(500).send("Error retrieving car");
      }
    });
};
