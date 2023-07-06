const Car = require("../models/CarModel");

// Function to create a car
exports.carRegister = (req, res) => {
  const { brand, model, immat } = req.body;

  // Validate user input
  if (!(brand && model && immat)) {
    return res.status(400).send("All input is required");
  }

  // Create a new car
  const newCar = new Car({ brand, model, immat });
  newCar
    .save()
    .then(() => res.status(200).json({ msg: "Car created" }))
    .catch((err) => res.status(500).send(err.message));
};

// Function to update a car
exports.carUpdate = (req, res) => {
  const { id } = req.params;
  const { brand, model, immat } = req.body;

  Car.findOneAndUpdate({ _id: id }, { brand, model, immat }, { new: true })
    .then(() => res.status(200).send("Update successful"))
    .catch((err) => res.status(500).send(err.message));
};

// Function to delete a car
exports.carDelete = (req, res) => {
  const { id } = req.params;

  Car.findOneAndRemove({ _id: id })
    .then(() => res.status(200).send("Car deleted successfully"))
    .catch((err) => res.status(500).send(err.message));
};

// Function to get car info
exports.carInfos = (req, res) => {
  const { id } = req.params;

  Car.findById(id)
    .then((car) => {
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).send("Car not found");
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send("Car not found");
      } else {
        res.status(500).send("Error retrieving car");
      }
    });
};

// Function to get all cars
exports.getAllCars = (req, res) => {
  Car.find({})
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};

// Function to get a car by ID
exports.getCarById = (req, res) => {
  Car.findById(req.params.id)
    .then((car) => {
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).send("Car not found");
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send("Car not found");
      } else {
        res.status(500).send("Error retrieving car");
      }
    });
};
