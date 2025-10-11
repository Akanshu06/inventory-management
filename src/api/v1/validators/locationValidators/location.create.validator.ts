import Joi from 'joi';

export const createLocationSchema = {
  body: Joi.object({
    name: Joi.string().required().trim().min(1).max(100),
    address: Joi.string().required().trim().min(1).max(200),
    manager: Joi.string().optional().trim().max(100),
    city: Joi.string().required().trim().max(50),
    state: Joi.string().required().trim().max(50),
    country: Joi.string().required().trim().max(50),
    zipCode: Joi.string().required().trim().max(20),
    isActive: Joi.boolean().default(true)
  })
};