const express = require("express")
const vehicleSchema = require("../middlewares/validation/schema/VehicleSchema")
const {validateRequest} = require("../middlewares/validation")
const {getAllVehicle,createVehicle,updateVehicle} = require("../controllers/vehicleController")

const router = express.Router()

router.get("/",getAllVehicle)
router.post("/",validateRequest(vehicleSchema.create),createVehicle)
router.patch("/:modelName",validateRequest(vehicleSchema.update),updateVehicle)
module.exports = router