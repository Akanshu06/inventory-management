import Joi from 'joi';

export const createProductSchema = {
  body: Joi.object({
    sku: Joi.string().uppercase().trim().optional(),
    name: Joi.string().trim().required().min(1).max(255),
    description: Joi.string().required().min(1).max(2000),
    price: Joi.number().positive().required(),
    costPrice: Joi.number().positive().required(),
    images: Joi.array().items(Joi.string().uri()).optional(),
    category: Joi.string().hex().length(24).required(),
    variants: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        options: Joi.array().items(Joi.string()).min(1).required(),
        additionalPrice: Joi.number().min(0).optional()
      })
    ).optional(),
    lowStockThreshold: Joi.number().integer().min(0).default(5)
  })
};

export const updateProductSchema = {
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

export const productIdSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
};

export const productQuerySchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    search: Joi.string().trim().optional(),
    category: Joi.string().hex().length(24).optional(),
    includeStock: Joi.boolean().default(false)
  })
};