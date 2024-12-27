class Vehicle {
  constructor(manufacture, models = [], variants = []) {
    this.manufacture = manufacture;
    this.models = models; // Array of model strings
    this.variants = variants; // Array of variant strings
  }

  validate() {
    // Validate manufacture
    if (!this.manufacture) {
      throw new Error("Manufacture is required");
    }
    if (typeof this.manufacture !== "string") {
      throw new Error("Manufacture must be a string");
    }

    // Validate models
    if (!Array.isArray(this.models)) {
      throw new Error("Models must be an array of strings");
    }
    if (!this.models.every((model) => typeof model === "string")) {
      throw new Error("All models must be strings");
    }

    // Validate variants
    if (!Array.isArray(this.variants)) {
      throw new Error("Variants must be an array of strings");
    }
    if (!this.variants.every((variant) => typeof variant === "string")) {
      throw new Error("All variants must be strings");
    }
  }

  toDynamoDBFormat() {
    return {
      manufacture: { S: this.manufacture },
      models: { L: this.models.map((model) => ({ S: model })) },
      variants: { L: this.variants.map((variant) => ({ S: variant })) },
    };
  }

  static fromDynamoDBFormat(item) {
    return new Vehicle(
      item.manufacture.S,
      item.models.L.map((model) => model.S),
      item.variants.L.map((variant) => variant.S)
    );
  }
}

module.exports = Vehicle;
