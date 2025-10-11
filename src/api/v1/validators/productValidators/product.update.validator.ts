import Joi from 'joi';

export const updateProductSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  }),
  body: Joi.object({
    sku: Joi.string().uppercase().trim().optional(),
    name: Joi.string().trim().min(1).max(255).optional(),
    description: Joi.string().min(1).max(2000).optional(),
    price: Joi.number().positive().optional(),
    costPrice: Joi.number().positive().optional(),
    images: Joi.array().items(Joi.string().uri()).optional(),
    category: Joi.string().hex().length(24).optional(),
    variants: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        options: Joi.array().items(Joi.string()).min(1).required(),
        additionalPrice: Joi.number().min(0).optional()
      })
    ).optional(),
    lowStockThreshold: Joi.number().integer().min(0).optional(),
    isActive: Joi.boolean().optional()
  }).min(1)
};