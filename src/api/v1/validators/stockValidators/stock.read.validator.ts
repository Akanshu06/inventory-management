import Joi from 'joi';

export const stockQuerySchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    threshold: Joi.number().integer().min(0).optional()
  })
};

export const productIdSchema = {
  params: Joi.object({
    productId: Joi.string().hex().length(24).required()
  })
};

export const locationIdSchema = {
  params: Joi.object({
    locationId: Joi.string().hex().length(24).required()
  })
};