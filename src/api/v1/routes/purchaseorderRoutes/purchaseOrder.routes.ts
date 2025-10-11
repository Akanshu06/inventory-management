import { Router } from 'express';

const router = Router();

// Temporary simple route for testing
router.post('/', (req, res) => {
  res.json({ message: 'Purchase order creation endpoint', body: req.body });
});

router.get('/', (req, res) => {
  res.json({ message: 'Purchase orders list endpoint' });
});

export { router as purchaseOrderRoutes };