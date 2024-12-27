const express = require("express");
const vehicleSchema = require("../middlewares/validation/schema/Vehicle.schema");
const { validateRequest } = require("../middlewares/validation");
const VehicleController = require("../controllers/vehicle.controller");

const router = express.Router();

router.get("/", VehicleController.getAllVehicles.bind(VehicleController));
router.post("/", validateRequest(vehicleSchema.create), VehicleController.createVehicle.bind(VehicleController));
router.patch(
  "/:manufacture",
  validateRequest(vehicleSchema.update),
  VehicleController.updateVehicle.bind(VehicleController)
);
router.delete(
    "/:manufacture",
    VehicleController.deleteVehicleById.bind(VehicleController)   
)

module.exports = router;
