import { Router } from 'express';
import { createProduct } from '../../controllors/productController/product.create';
import { getProducts, getProductById, exportProducts } from '../../controllors/productController/product.read';
import { updateProduct } from '../../controllors/productController/product.update';
import { deleteProduct } from '../../controllors/productController/product.delete';

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/export', exportProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export { router as productRoutes };