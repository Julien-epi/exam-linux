const express = require("express");
const router = express.Router();
const car = require("../models/CarModel");
const carController = require("../controllers/carController");

// car router with the carController and methods
router.post("/register", carController.carRegister);
router.put("/update/:id", carController.carUpdate);
router.delete("/delete/:id", carController.carDelete);
router.get("/cars", carController.getAllCars);
router.get("/car/:id", carController.getCarById);

module.exports = router;
