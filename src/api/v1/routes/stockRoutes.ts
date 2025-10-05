import { Router } from 'express';
import { StockController } from '../controllers/StockController';
import { validate } from '../../../middlewares/validation';
import { 
  updateStockSchema,
  stockQuerySchema,
  productIdSchema,
  locationIdSchema,
  reserveStockSchema
} from '../validators/stockValidators';

const router = Router();

router.post(
  '/update',
  validate(updateStockSchema),
  StockController.updateStock
);

router.post(
  '/reserve',
  validate(reserveStockSchema),
  StockController.reserveStock
);

router.post(
  '/release',
  validate(reserveStockSchema),
  StockController.releaseReservedStock
);

router.get(
  '/product/:productId',
  validate(productIdSchema),
  StockController.getStockByProduct
);

router.get(
  '/location/:locationId',
  validate(locationIdSchema),
  StockController.getStockByLocation
);

router.get(
  '/low-stock',
  validate(stockQuerySchema),
  StockController.getLowStock
);

router.get(
  '/export',
  StockController.exportStock
);

export { router as stockRoutes };