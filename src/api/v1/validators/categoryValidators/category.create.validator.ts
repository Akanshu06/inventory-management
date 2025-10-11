import Joi from 'joi';

export const createCategorySchema = {
  body: Joi.object({
    name: Joi.string().required().trim().min(1).max(100),
    description: Joi.string().optional().allow('').max(500),
    parent: Joi.string().hex().length(24).optional(),
    isActive: Joi.boolean().default(true)
  })
};