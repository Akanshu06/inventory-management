import Joi from 'joi';
import { PurchaseOrderStatus } from '../../../models/PurchaseOrder';

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
    status: Joi.string().valid(...Object.values(PurchaseOrderStatus)).default(PurchaseOrderStatus.DRAFT),
    expectedDelivery: Joi.date().iso().optional(),
    notes: Joi.string().max(1000).optional()
  })
};

export const updatePurchaseOrderStatusSchema = {
  body: Joi.object({
    status: Joi.string().valid(...Object.values(PurchaseOrderStatus)).required(),
    locationId: Joi.string().hex().length(24).when('status', {
      is: PurchaseOrderStatus.RECEIVED,
      then: Joi.required(),
      otherwise: Joi.optional()
    })
  })
};

export const addItemToPOSchema = {
  body: Joi.object({
    product: Joi.string().hex().length(24).required(),
    quantity: Joi.number().integer().min(1).required(),
    unitCost: Joi.number().positive().required()
  })
};

export const purchaseOrderIdSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
};

export const purchaseOrderQuerySchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    status: Joi.string().valid(...Object.values(PurchaseOrderStatus)).optional()
  })
};