const express = require("express")
const vehicleRouter = require("./vehicle.routes")

const router = express.Router()

router.use("/vehicle",vehicleRouter)
module.exports = router