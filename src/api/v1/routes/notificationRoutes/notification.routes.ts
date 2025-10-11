import { Router } from 'express';
import { getNotifications, getUnreadCount } from '../../controllors/notificationController/notification.read';
import { markAsRead, markAllAsRead } from '../../controllors/notificationController/notification.update';

const router = Router();

router.get('/', getNotifications);
router.get('/unread-count', getUnreadCount);
router.put('/:id/read', markAsRead);
router.put('/mark-all-read', markAllAsRead);

export { router as notificationRoutes };