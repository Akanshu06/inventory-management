import { Router } from 'express';
import { updateStock } from '../../controllors/stockController/stock.update';

const router = Router();

router.post('/update', updateStock);

export { router as stockUpdateRoutes };