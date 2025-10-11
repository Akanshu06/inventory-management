import Joi from 'joi';

export const reserveStockSchema = {
  body: Joi.object({
    productId: Joi.string().hex().length(24).required(),
    locationId: Joi.string().hex().length(24).required(),
    quantity: Joi.number().integer().min(1).required(),
    reason: Joi.string().max(500).optional()
  })
};