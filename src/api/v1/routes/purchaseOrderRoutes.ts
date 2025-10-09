import { Router } from 'express';
import { validate } from '../../../middlewares/validation';
import { PurchaseOrderController } from '../controllors/purchaseOrderController';
import {
    addItemToPOSchema,
    createPurchaseOrderSchema,
    purchaseOrderIdSchema,
    purchaseOrderQuerySchema,
    updatePurchaseOrderStatusSchema
} from '../validators/purchaseOrderValidater';

const router = Router();

// router.post(
//   '/',
//   (req, res) => {
//     console.log('POST /purchase-orders hit');
//     console.log('Body:', req.body);
//     res.json({ message: 'POST route working', body: req.body });
//   }
// );

router.post(
  '/',
  validate(createPurchaseOrderSchema)
  ,PurchaseOrderController.createPurchaseOrder
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
