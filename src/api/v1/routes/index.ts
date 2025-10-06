import { Router } from 'express';
import { categoryRoutes } from './categoryRoutes';
import { locationRoutes } from './locationRoutes';
import { notificationRoutes } from './notificationRoutes';
import { productRoutes } from './ProductRoutes';
import { purchaseOrderRoutes } from './purchaseOrderRoutes';
import { stockRoutes } from './stockRoutes';

const router = Router();

console.log('Registering routes...');
router.use('/categories', categoryRoutes);
console.log('Categories route registered');
router.use('/locations', locationRoutes);
console.log('Locations route registered');
router.use('/products', productRoutes);
console.log('Products route registered');
router.use('/stock', stockRoutes);
console.log('Stock route registered');
router.use('/purchase-orders', purchaseOrderRoutes);
console.log('Purchase orders route registered');
router.use('/notifications', notificationRoutes);
console.log('Notifications route registered');

export { router as v1Routes };
