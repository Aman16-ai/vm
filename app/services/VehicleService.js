const Vehicle = require('../model/Vehicle')

class VehicleService {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    async createVehicle(vehicleData) {
        const vehicle = new Vehicle(
            vehicleData.manufacture,
            vehicleData.models,
            vehicleData.variants,
        );

        return await this.vehicleRepository.createVehicle(vehicle);
    }

    async getAllVehicles() {
        return await this.vehicleRepository.getAllVehicles();
    }

    async updateVehicle(key,updates) {
        return await this.vehicleRepository.updateVehicle(key,updates)
    }

    async deleteVehicleById(id) {
        return await this.vehicleRepository.deleteVehicleById(id)
    }
}

module.exports = VehicleService;