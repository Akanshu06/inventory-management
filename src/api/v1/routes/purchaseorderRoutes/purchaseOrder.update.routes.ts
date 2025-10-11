import { Router } from 'express';

const router = Router();

router.put('/:id/status', (req, res) => {
  res.json({ message: 'Purchase order status update endpoint', id: req.params.id, body: req.body });
});

router.post('/:id/items', (req, res) => {
  res.json({ message: 'Add item to purchase order endpoint', id: req.params.id, body: req.body });
});

export { router as purchaseOrderUpdateRoutes };