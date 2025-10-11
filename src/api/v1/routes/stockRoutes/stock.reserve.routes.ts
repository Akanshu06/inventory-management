import { Router } from 'express';
import { reserveStock, releaseReservedStock } from '../../controllors/stockController/stock.reserve';

const router = Router();

router.post('/reserve', reserveStock);
router.post('/release', releaseReservedStock);

export { router as stockReserveRoutes };