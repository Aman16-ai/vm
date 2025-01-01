const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const { except } = chai;
const app = require("../../index");
const VehicleController = require("../controllers/vehicle.controller");
const VehicleService = require("../services/VehicleService");

describe("Vehicle Module", () => {
  let req, res, next, vehicleServiceStub;
  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
    vehicleServiceStub = sinon.stub(VehicleService.prototype);
    VehicleController.vehicleService = vehicleServiceStub;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("getAllVehicles", () => {
    it("should return all vehicles with status 200", async () => {
      const mockVehicles = [
        { manufacture: "Honda", models: ["CBR"], variants: ["Petrol"] },
      ];
      vehicleServiceStub.getAllVehicles.resolves(mockVehicles);

      await VehicleController.getAllVehicles(req, res, next);

      expect(vehicleServiceStub.getAllVehicles.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ status: true, Response: mockVehicles })).to
        .be.true;
    });

    it("should call next with an error if service fails", async () => {
      const error = new Error("Database error");
      vehicleServiceStub.getAllVehicles.rejects(error);

      await VehicleController.getAllVehicles(req, res, next);

      expect(next.calledOnceWith(error)).to.be.true;
    });
  });
});
