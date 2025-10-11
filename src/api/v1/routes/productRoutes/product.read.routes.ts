import { Router } from 'express';
import { getProducts, getProductById, exportProducts } from '../../controllors/productController/product.read';

const router = Router();

router.get('/', getProducts);
router.get('/export', exportProducts);
router.get('/:id', getProductById);

export { router as productReadRoutes };