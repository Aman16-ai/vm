const VehicleReposirty = require("../repository/vehicleRepositry");
const VehicleService = require("../services/VehicleService");
const parseDynamoDBResponse = require("../util/dynamoDataParser");
const Vehicle = require("../model/Vehicle");
const dynamoDB = require("../config/db");
const Logger = require("../util/logger");

class VehicleController {
  constructor() {
    this.logger = new Logger();
    this.vehicleRepositry = new VehicleReposirty(dynamoDB, "VechiclePoliciesInfo", this.logger);
    this.vehicleService = new VehicleService(this.vehicleRepositry);
  }

  async getAllVehicles(req, res, next) {
    try {
      const result = await this.vehicleService.getAllVehicles();
      return res.status(200).json({ status: true, Response: result });
    } catch (err) {
      next(err);
    }
  }

  async createVehicle(req, res, next) {
    try {
      const result = await this.vehicleService.createVehicle(req.body);
      return res.status(200).json({ status: true, Response: "Vehicle created" });
    } catch (err) {
      next(err);
    }
  }

  async updateVehicle(req, res, next) {
    try {
      const manufacture = req.params;
      const updates = req.body;
      const result = await this.vehicleService.updateVehicle(manufacture, updates);
      console.log(result);
      return res.status(200).json({ status: true, Response: "Vehicle updated" });
    } catch (err) {
      next(err);
    }
  }

  async deleteVehicleById(req,res,next) {
    try {
      let id = req.params.manufacture;
      const result = await this.vehicleService.deleteVehicleById(id)
      console.log(result) 
      return res.status(200).json({status: true, Response: "Vehicle Deleted successfully"})
    }
    catch(err) {
      next(err)
    }
  }
}

module.exports = new VehicleController();
