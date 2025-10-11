import Joi from 'joi';

export const createNotificationSchema = {
  body: Joi.object({
    type: Joi.string().valid('LOW_STOCK', 'STOCK_EXPIRY', 'ORDER_STATUS', 'SYSTEM').required(),
    title: Joi.string().required().trim().min(1).max(200),
    message: Joi.string().required().trim().min(1).max(1000),
    relatedId: Joi.string().hex().length(24).optional(),
    status: Joi.string().valid('UNREAD', 'READ').default('UNREAD')
  })
};