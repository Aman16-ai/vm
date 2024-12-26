const ValidationError = require("../../Error/ValidationError")

const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.context.key,
                message: detail.message
            }));

            throw new ValidationError('Validation failed', errors);
        }
        req.body = value;
        next();
    };
};

module.exports = { validateRequest };