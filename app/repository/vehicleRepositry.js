const IVehicleRepository = require("./IVehicleRepository");
const DatabaseError = require("../Error/DatabaseError");
const ConflictError = require("../Error/ConflictError");
const Vehicle = require("../model/Vehicle");
const marshallValue = require("../util/dynamoDataParser");
class VehicleReposirty extends IVehicleRepository {
  constructor(dynamoDB, tableName, logger) {
    super();
    this.dynamoDB = dynamoDB;
    this.tableName = tableName;
    this.logger = logger;
  }

  async createVehicle(vehicle) {
    try {
      // Validate vehicle instance
      console.log(vehicle);
      vehicle.validate();
      // Check for existing vehicle
      const existingVehicle = await this.getVehicleByManufacturer(
        vehicle.manufacture
      );
      if (existingVehicle) {
        console.log("runnign");
        throw new ConflictError("Vehicle model already exists");
      }

      // Prepare DynamoDB params
      const params = {
        TableName: this.tableName,
        Item: vehicle.toDynamoDBFormat(),
      };
      console.log(params);
      await this.dynamoDB.putItem(params).promise();
      this.logger.info(`Vehicle created successfully: ${vehicle.modelName}`);

      return vehicle;
    } catch (error) {
      this.logger.error(`Error creating vehicle: ${error.message}`);
      if (error instanceof ConflictError) {
        throw error;
      }
      throw new DatabaseError(`Failed to create vehicle: ${error.message}`);
    }
  }

  async getAllVehicles() {
    try {
      const params = { TableName: this.tableName };
      const data = await this.dynamoDB.scan(params).promise();

      return data.Items.map((item) => Vehicle.fromDynamoDBFormat(item));
    } catch (error) {
      this.logger.error(`Error fetching vehicles: ${error.message}`);
      throw new DatabaseError(`Failed to fetch vehicles: ${error.message}`);
    }
  }

  async getVehicleByManufacturer(manufacture) {
    try {
      const params = {
        TableName: this.tableName,
        Key: {
          manufacture: { S: manufacture },
        },
      };

      const data = await this.dynamoDB.getItem(params).promise();
      return data.Item ? Vehicle.fromDynamoDBFormat(data.Item) : null;
    } catch (error) {
      this.logger.error(`Error fetching vehicle by model: ${error.message}`);
      throw new DatabaseError(`Failed to fetch vehicle: ${error.message}`);
    }
  }

  async updateVehicle(key, updates) {
    try {
      console.log(key);

      let updateExpression = "SET";
      const expressionAttributeNames = {};
      const expressionAttributeValues = {};

      // Build update expression for each field
      Object.entries(updates).forEach(([field, value], index) => {
        // Skip undefined or null values
        if (value === undefined || value === null) return;

        const attributeName = `#field${index}`;
        const attributeValue = `:value${index}`;

        // Append to the update expression
        updateExpression += ` ${attributeName} = ${attributeValue}${
          index !== Object.keys(updates).length - 1 ? "," : ""
        }`;

        expressionAttributeNames[attributeName] = field;

        // Use specific marshalling for arrays
        expressionAttributeValues[attributeValue] = Array.isArray(value)
          ? { L: value.map((v) => ({ S: v })) } // List of strings
          : marshallValue(value); // Use marshallValue for other types
      });

      // Remove trailing comma if last fields were skipped
      updateExpression = updateExpression.replace(/,\s*$/, "");

      console.log(updateExpression);

      const params = {
        TableName: this.tableName,
        Key: {
          manufacture: { S: key.manufacture },
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW",
      };

      console.log(params);

      const result = await this.dynamoDB.updateItem(params).promise();
      console.log(result);

      return result;
    } catch (error) {
      throw new DatabaseError(`Failed to update vehicle: ${error.message}`);
    }
  }

  async deleteVehicleById(manufacture) {
    try {
      const params = {
        TableName: this.tableName,
        Key: {
          manufacture: { S: manufacture },
        },
        ConditionExpression: "attribute_exists(manufacture)", // Ensure the item exists
      };

      await this.dynamoDB.deleteItem(params).promise();
      this.logger.info(
        `Vehicle with manufacture: ${manufacture} deleted successfully.`
      );
      return true;
    } catch (error) {
      this.logger.error(`Error deleting vehicle: ${error.message}`);
      if (error.code === "ConditionalCheckFailedException") {
        throw new DatabaseError(
          `Vehicle with manufacture: ${manufacture} does not exist.`
        );
      }
      throw new DatabaseError(`Failed to delete vehicle: ${error.message}`);
    }
  }
}

module.exports = VehicleReposirty;
