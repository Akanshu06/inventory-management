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