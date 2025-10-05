import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { validate } from '../../../middlewares/validation';
import { 
  createProductSchema, 
  updateProductSchema, 
  productIdSchema, 
  productQuerySchema 
} from '../validators/productValidators';

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