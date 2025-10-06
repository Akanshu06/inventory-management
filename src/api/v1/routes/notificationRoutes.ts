import { Router } from 'express';
import { NotificationController } from '../controllors/notificationController';

const router = Router();

router.get('/', NotificationController.getNotifications);

router.get('/unread-count', NotificationController.getUnreadCount);

router.put('/:id/read', NotificationController.markAsRead);

router.put('/mark-all-read', NotificationController.markAllAsRead);

export { router as notificationRoutes };
