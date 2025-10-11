import Joi from 'joi';

export const createPurchaseOrderSchema = {
  body: Joi.object({
    poNumber: Joi.string().uppercase().trim().optional(),
    supplier: Joi.string().trim().required().min(1).max(255),
    items: Joi.array().items(
      Joi.object({
        product: Joi.string().hex().length(24).required(),
        quantity: Joi.number().integer().min(1).required(),
        unitCost: Joi.number().positive().required()
      })
    ).min(1).required(),
    status: Joi.string().valid('DRAFT', 'SUBMITTED', 'APPROVED', 'RECEIVED', 'CANCELLED').default('DRAFT'),
    expectedDelivery: Joi.date().iso().optional(),
    notes: Joi.string().max(1000).optional()
  })
};