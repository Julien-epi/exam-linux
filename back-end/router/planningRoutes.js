const express = require("express");
const router = express.Router();
const planningController = require("../controllers/planningController");

router.post("/create", planningController.createSlot);
router.put("/update/:id", planningController.updateSlot);
router.delete("/delete/:id", planningController.deleteSlot);
router.get("/", planningController.getAllSlots);
router.get("/:id", planningController.getSlotById);

module.exports = router;
