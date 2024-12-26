const Joi = require("joi");

const vehicleSchema = {
  create: Joi.object({
    modelName: Joi.string().required().trim().messages({
      "string.empty": "Model name cannot be empty",
      "any.required": "Model name is required",
    }),
    company: Joi.string().required().trim().messages({
      "string.empty": "Company name cannot be empty",
      "any.required": "Company name is required",
    }),
    engine: Joi.string().required().trim().messages({
      "string.empty": "Engine details cannot be empty",
      "any.required": "Engine details are required",
    }),
    basePrice: Joi.number().required().positive().messages({
      "number.base": "Base price must be a number",
      "number.positive": "Base price must be positive",
      "any.required": "Base price is required",
    }),
    maxPrice: Joi.number()
      .required()
      .positive()
      .greater(Joi.ref("basePrice"))
      .messages({
        "number.base": "Max price must be a number",
        "number.positive": "Max price must be positive",
        "number.greater": "Max price must be greater than base price",
        "any.required": "Max price is required",
      }),
  }),

  update: Joi.object({
    modelName: Joi.string().trim(),
    company: Joi.string().trim(),
    engine: Joi.string().trim(),
    basePrice: Joi.number().positive(),
    maxPrice: Joi.number()
      .positive()
      .when("basePrice", {
        is: Joi.exist(),
        then: Joi.number().greater(Joi.ref("basePrice")),
      }),
  }),
};

module.exports = vehicleSchema;
