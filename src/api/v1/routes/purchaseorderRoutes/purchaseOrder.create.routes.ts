import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  res.json({ message: 'Purchase order create endpoint', body: req.body });
});

export { router as purchaseOrderCreateRoutes };