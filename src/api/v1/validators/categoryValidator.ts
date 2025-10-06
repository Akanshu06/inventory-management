import Joi from 'joi';

export const createCategorySchema = {
  body: Joi.object({
    name: Joi.string().required().trim().min(1).max(100),
    description: Joi.string().optional().allow('').max(500),
    parent: Joi.string().hex().length(24).optional(),
    isActive: Joi.boolean().default(true)
  })
};

export const updateCategorySchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  }),
  body: Joi.object({
    name: Joi.string().optional().trim().min(1).max(100),
    description: Joi.string().optional().allow('').max(500),
    parent: Joi.string().hex().length(24).optional(),
    isActive: Joi.boolean().optional()
  })
};

export const categoryIdSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
};