import { Router } from 'express';
import { updateStock } from '../../controllors/stockController/stock.update';
import { getStockByProduct, getStockByLocation, exportStock } from '../../controllors/stockController/stock.read';
import { reserveStock, releaseReservedStock } from '../../controllors/stockController/stock.reserve';
import { getLowStock } from '../../controllors/stockController/stock.alert';

const router = Router();

router.post('/update', updateStock);
router.post('/reserve', reserveStock);
router.post('/release', releaseReservedStock);
router.get('/product/:productId', getStockByProduct);
router.get('/location/:locationId', getStockByLocation);
router.get('/low-stock', getLowStock);
router.get('/export', exportStock);

export { router as stockRoutes };