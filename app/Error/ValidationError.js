class ValidationError extends Error {
    constructor(message, details = []) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 422;
        this.details = details;
    }
}
module.exports = ValidationError