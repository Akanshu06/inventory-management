import Joi from 'joi';

export const createLocationSchema = {
  body: Joi.object({
    name: Joi.string().required().trim().min(1).max(100),
    address: Joi.string().required().trim().min(1).max(200),
    manager: Joi.string().required().trim().min(1).max(100),
    city: Joi.string().trim().max(100),
    state: Joi.string().trim().max(100),
    country: Joi.string().trim().max(100),
    zipCode: Joi.string().trim().max(20),
    isActive: Joi.boolean().default(true)
  })
};

export const updateLocationSchema = {
  params: Joi.object({
    locationId: Joi.string().hex().length(24).required()
  }),
  body: Joi.object({
    name: Joi.string().trim().min(1).max(100),
    address: Joi.string().trim().min(1).max(200),
    manager: Joi.string().trim().min(1).max(100),
    city: Joi.string().trim().max(100),
    state: Joi.string().trim().max(100),
    country: Joi.string().trim().max(100),
    zipCode: Joi.string().trim().max(20),
    isActive: Joi.boolean()
  }).min(1)
};

export const locationIdSchema = {
  params: Joi.object({
    locationId: Joi.string().hex().length(24).required()
  })
};