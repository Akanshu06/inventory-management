import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Purchase orders list endpoint' });
});

router.get('/export', (req, res) => {
  res.json({ message: 'Purchase orders export endpoint' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Purchase order details endpoint', id: req.params.id });
});

export { router as purchaseOrderReadRoutes };