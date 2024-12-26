class Vehicle {
    constructor(modelName, company, engine, basePrice, maxPrice) {
        this.modelName = modelName;
        this.company = company;
        this.engine = engine;
        this.basePrice = basePrice;
        this.maxPrice = maxPrice;
    }

    validate() {
        if (!this.modelName || !this.company || !this.engine) {
            throw new Error('Missing required fields');
        }
        if (this.basePrice <= 0 || this.maxPrice <= 0) {
            throw new Error('Prices must be positive numbers');
        }
        if (this.maxPrice < this.basePrice) {
            throw new Error('Max price cannot be less than base price');
        }
    }

    toDynamoDBFormat() {
        return {
            model_name: { S: this.modelName },
            company: { S: this.company },
            engine: { S: this.engine },
            base_price: { N: this.basePrice.toString() },
            max_price: { N: this.maxPrice.toString() }
        };
    }

    static fromDynamoDBFormat(item) {
        return new Vehicle(
            item.model_name.S,
            item.company.S,
            item.engine.S,
            parseFloat(item.base_price.N),
            parseFloat(item.max_price.N)
        );
    }
}

module.exports = Vehicle;