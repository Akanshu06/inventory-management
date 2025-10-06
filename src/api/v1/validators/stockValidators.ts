import Joi from 'joi';

export const updateStockSchema = {
  body: Joi.object({
    productId: Joi.string().hex().length(24).required(),
    locationId: Joi.string().hex().length(24).required(),
    quantity: Joi.number().integer().required(),
    type: Joi.string().valid('IN', 'OUT', 'ADJUSTMENT').required(),
    reason: Joi.string().max(500).optional(),
    reference: Joi.string().max(100).optional()
  })
};

export const reserveStockSchema = {
  body: Joi.object({
    productId: Joi.string().hex().length(24).required(),
    locationId: Joi.string().hex().length(24).required(),
    quantity: Joi.number().integer().min(1).required(),
    reason: Joi.string().max(500).optional()
  })
};

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