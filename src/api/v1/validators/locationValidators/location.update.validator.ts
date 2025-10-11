import Joi from 'joi';

export const updateLocationSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  }),
  body: Joi.object({
    name: Joi.string().optional().trim().min(1).max(100),
    address: Joi.string().optional().trim().min(1).max(200),
    manager: Joi.string().optional().trim().max(100),
    city: Joi.string().optional().trim().max(50),
    state: Joi.string().optional().trim().max(50),
    country: Joi.string().optional().trim().max(50),
    zipCode: Joi.string().optional().trim().max(20),
    isActive: Joi.boolean().optional()
  })
};