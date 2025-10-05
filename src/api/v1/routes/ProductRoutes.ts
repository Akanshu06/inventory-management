import { Router } from 'express';
import { validate } from '../../../middlewares/validation';
import { ProductController } from '../controllors/productController';
import {
    createProductSchema,
    productIdSchema,
    productQuerySchema,
    updateProductSchema
} from '../validators/productValidator';

const router = Router();

router.post(
  '/',
  validate(createProductSchema),
  ProductController.createProduct
);

router.get(
  '/',
  validate(productQuerySchema),
  ProductController.getProducts
);

router.get(
  '/export',
  ProductController.exportProducts
);

router.get(
  '/:id',
  validate(productIdSchema),
  ProductController.getProduct
);

router.put(
  '/:id',
  validate(updateProductSchema),
  ProductController.updateProduct
);

router.delete(
  '/:id',
  validate(productIdSchema),
  ProductController.deleteProduct
);

export { router as productRoutes };
