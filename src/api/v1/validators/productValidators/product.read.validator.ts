import Joi from 'joi';

export const productIdSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
};

export const productQuerySchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    search: Joi.string().trim().optional(),
    category: Joi.string().hex().length(24).optional(),
    includeStock: Joi.boolean().default(false)
  })
};