import Joi from 'joi';

export const purchaseOrderIdSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
};

export const purchaseOrderQuerySchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    status: Joi.string().valid('DRAFT', 'SUBMITTED', 'APPROVED', 'RECEIVED', 'CANCELLED').optional()
  })
};