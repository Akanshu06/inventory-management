import { Router } from 'express';
import { categoryRoutes } from './categoryRoutes/category.routes';
import { locationRoutes } from './locationRoutes/location.routes';
import { notificationRoutes } from './notificationRoutes/notification.routes';
import { productRoutes } from './productRoutes/product.routes';
import { purchaseOrderRoutes } from './purchaseorderRoutes/purchaseOrder.routes';
import { stockRoutes } from './stockRoutes/stock.routes';

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
