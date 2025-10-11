import { Router } from 'express';
import { updateProduct } from '../../controllors/productController/product.update';

const router = Router();

router.put('/:id', updateProduct);

export { router as productUpdateRoutes };