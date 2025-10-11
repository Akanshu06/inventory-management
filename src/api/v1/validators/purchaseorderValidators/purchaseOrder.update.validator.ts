import Joi from 'joi';

export const updatePurchaseOrderStatusSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  }),
  body: Joi.object({
    status: Joi.string().valid('DRAFT', 'SUBMITTED', 'APPROVED', 'RECEIVED', 'CANCELLED').required(),
    locationId: Joi.string().hex().length(24).when('status', {
      is: 'RECEIVED',
      then: Joi.required(),
      otherwise: Joi.optional()
    })
  })
};

export const addItemToPOSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  }),
  body: Joi.object({
    product: Joi.string().hex().length(24).required(),
    quantity: Joi.number().integer().min(1).required(),
    unitCost: Joi.number().positive().required()
  })
};