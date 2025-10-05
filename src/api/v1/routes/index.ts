import { Router } from 'express';
import { productRoutes } from './productRoutes';
import { stockRoutes } from './stockRoutes';
import { purchaseOrderRoutes } from './purchaseOrderRoutes';
import { notificationRoutes } from './notificationRoutes';

const router = Router();

router.use('/products', productRoutes);
router.use('/stock', stockRoutes);
router.use('/purchase-orders', purchaseOrderRoutes);
router.use('/notifications', notificationRoutes);

export { router as v1Routes };