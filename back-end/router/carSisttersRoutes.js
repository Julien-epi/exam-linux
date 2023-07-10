const express = require("express");
const router = express.Router();
const carSisttersController = require("../controllers/carSisttersController");

// car router with the carController and methods
router.post("/register", carSisttersController.carSisttersRegister);
router.put("/update/:id", carSisttersController.carSisttersUpdate);
router.delete("/delete/:id", carSisttersController.carSisttersDelete);
router.get("/findCarSitterById/:id", carSisttersController.getCarSisttersById);
router.get("/AllCarSistters", carSisttersController.getAllCarSistters);

module.exports = router;
