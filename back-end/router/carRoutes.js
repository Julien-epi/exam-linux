const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

// car router with the carController and methods
router.post("/register", carController.carRegister);
router.put("/update/:id", carController.carUpdate);
router.delete("/delete/:id", carController.carDelete);
router.get("/findCarById/:id", carController.getCarById);
router.get("/Allcars", carController.getAllCars);

module.exports = router;
