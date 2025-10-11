import Joi from 'joi';

export const lowStockQuerySchema = {
  query: Joi.object({
    threshold: Joi.number().integer().min(0).optional()
  })
};