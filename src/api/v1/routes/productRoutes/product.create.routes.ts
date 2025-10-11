import { Router } from 'express';
import { createProduct } from '../../controllors/productController/product.create';

const router = Router();

router.post('/', createProduct);

export { router as productCreateRoutes };