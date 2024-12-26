const VehicleReposirty = require("../repository/vehicleRepositry");
const VehicleService = require("../services/VehicleService");
const parseDynamoDBResponse = require("../util/dynamoDataParser");
const Vehicle = require("../model/Vehicle");
const dynamoDB = require("../config/db");
const Logger = require("../util/logger");
const { update } = require("../middlewares/validation/schema/VehicleSchema");
const getAllVehicle = async (req, res, next) => {
  try {
    const logger = new Logger();
    const vehicleRepositry = new VehicleReposirty(dynamoDB, "ACTaskDB", logger);
    const vehicleService = new VehicleService(vehicleRepositry);
    const result = await vehicleService.getAllVehicles();
    // const parsedData = parseDynamoDBResponse(result)
    return res.status(200).json({ status: true, Response: result });
  } catch (err) {
    next(err);
  }
};

const createVehicle = async (req, res, next) => {
  try {
    const logger = new Logger();
    const vehicle = new Vehicle(
      req.body.modelName,
      req.body.company,
      req.body.engine,
      req.body.basePrice,
      req.body.maxPrice
    );
    const vehicleRepositry = new VehicleReposirty(dynamoDB, "ACTaskDB", logger);
    const vehicleService = new VehicleService(vehicleRepositry);
    const result = await vehicleService.createVehicle(vehicle);
    return res.status(200).json({ status: true, Response: "Vehicle created" });
  } catch (err) {
    next(err);
  }
};

const updateVehicle = async (req, res, next) => {
  try {
    const logger = new Logger();
    let modelName = req.params;
    let updates = req.body;
    const vehicleRepositry = new VehicleReposirty(dynamoDB, "ACTaskDB", logger);
    const vehicleService = new VehicleService(vehicleRepositry);
    const result = await vehicleService.updateVehicle(modelName, updates);
    console.log(result)
    return res.status(200).json({ status: true, Response: "Vehicle created" });
  } catch (err) {
    next(err);
  }
};
module.exports = { getAllVehicle, createVehicle, updateVehicle };
