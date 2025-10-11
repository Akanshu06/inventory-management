import { Router } from 'express';
import { getStockByProduct, getStockByLocation, exportStock } from '../../controllors/stockController/stock.read';

const router = Router();

router.get('/product/:productId', getStockByProduct);
router.get('/location/:locationId', getStockByLocation);
router.get('/export', exportStock);

export { router as stockReadRoutes };