import { Router } from 'express';
import { deleteProduct } from '../../controllors/productController/product.delete';

const router = Router();

router.delete('/:id', deleteProduct);

export { router as productDeleteRoutes };