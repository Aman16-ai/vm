const Vehicle = require('../model/Vehicle')

class VehicleService {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    async createVehicle(vehicleData) {
        const vehicle = new Vehicle(
            vehicleData.modelName,
            vehicleData.company,
            vehicleData.engine,
            vehicleData.basePrice,
            vehicleData.maxPrice
        );

        return await this.vehicleRepository.createVehicle(vehicle);
    }

    async getAllVehicles() {
        return await this.vehicleRepository.getAllVehicles();
    }

    async updateVehicle(key,updates) {
        return await this.vehicleRepository.updateVehicle(key,updates)
    }
}

module.exports = VehicleService;