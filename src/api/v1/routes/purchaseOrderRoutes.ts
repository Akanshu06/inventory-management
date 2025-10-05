import { Router } from 'express';
import { PurchaseOrderController } from '../controllers/PurchaseOrderController';
import { validate } from '../../../middlewares/validation';
import { 
  createPurchaseOrderSchema,
  updatePurchaseOrderStatusSchema,
  addItemToPOSchema,
  purchaseOrderIdSchema,
  purchaseOrderQuerySchema
} from '../validators/purchaseOrderValidators';

const router = Router();

router.post(
  '/',
  validate(createPurchaseOrderSchema),
  PurchaseOrderController.createPurchaseOrder
);

router.get(
  '/',
  validate(purchaseOrderQuerySchema),
  PurchaseOrderController.getPurchaseOrders
);

router.get(
  '/export',
  PurchaseOrderController.exportPurchaseOrders
);

router.get(
  '/:id',
  validate(purchaseOrderIdSchema),
  PurchaseOrderController.getPurchaseOrder
);

router.put(
  '/:id/status',
  validate(updatePurchaseOrderStatusSchema),
  PurchaseOrderController.updatePurchaseOrderStatus
);

router.post(
  '/:id/items',
  validate(addItemToPOSchema),
  PurchaseOrderController.addItemToPurchaseOrder
);

export { router as purchaseOrderRoutes };