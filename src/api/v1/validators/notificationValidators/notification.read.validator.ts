import Joi from 'joi';

export const notificationQuerySchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    type: Joi.string().valid('LOW_STOCK', 'STOCK_EXPIRY', 'ORDER_STATUS', 'SYSTEM').optional(),
    status: Joi.string().valid('UNREAD', 'READ').optional()
  })
};