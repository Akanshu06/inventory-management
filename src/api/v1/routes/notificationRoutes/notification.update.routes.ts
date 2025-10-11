import { Router } from 'express';
import { markAsRead, markAllAsRead } from '../../controllors/notificationController/notification.update';

const router = Router();

router.put('/:id/read', markAsRead);
router.put('/mark-all-read', markAllAsRead);

export { router as notificationUpdateRoutes };