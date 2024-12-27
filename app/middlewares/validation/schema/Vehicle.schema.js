const Joi = require("joi");

const vehicleSchema = {
  create: Joi.object({
    manufacture: Joi.string().required().trim().messages({
      "string.empty": "Manufacture cannot be empty",
      "any.required": "Manufacture is required",
    }),
    models: Joi.array()
      .items(Joi.string().trim().messages({
        "string.empty": "Each model name must be a non-empty string",
      }))
      .required()
      .min(1)
      .messages({
        "array.base": "Models must be an array of strings",
        "array.min": "At least one model is required",
        "any.required": "Models are required",
      }),
    variants: Joi.array()
      .items(Joi.string().trim().messages({
        "string.empty": "Each variant name must be a non-empty string",
      }))
      .required()
      .min(1)
      .messages({
        "array.base": "Variants must be an array of strings",
        "array.min": "At least one variant is required",
        "any.required": "Variants are required",
      }),
  }),

  update: Joi.object({
    manufacture: Joi.string().trim().messages({
      "string.empty": "Manufacture cannot be empty",
    }),
    models: Joi.array()
      .items(Joi.string().trim().messages({
        "string.empty": "Each model name must be a non-empty string",
      }))
      .messages({
        "array.base": "Models must be an array of strings",
      }),
    variants: Joi.array()
      .items(Joi.string().trim().messages({
        "string.empty": "Each variant name must be a non-empty string",
      }))
      .messages({
        "array.base": "Variants must be an array of strings",
      }),
  }),
};

module.exports = vehicleSchema;
