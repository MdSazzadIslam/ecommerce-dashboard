import Joi from 'joi';

export const salesDataSchema = Joi.object({
    product: Joi.string().required(),
    salesRevenue: Joi.number().positive().required(),
    region: Joi.string().required(),
    category: Joi.string().required(),
    date: Joi.date().iso().required(),
    cost: Joi.number().positive().required(),
    profit: Joi.number().required(),
    ageGroup: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    occupation: Joi.string().required(),
});