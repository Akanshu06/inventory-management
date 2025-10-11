import { Router } from 'express';
import { getLowStock } from '../../controllors/stockController/stock.alert';

const router = Router();

router.get('/low-stock', getLowStock);

export { router as stockAlertRoutes };