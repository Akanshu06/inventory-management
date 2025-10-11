import { Router } from 'express';
import { getNotifications, getUnreadCount } from '../../controllors/notificationController/notification.read';

const router = Router();

router.get('/', getNotifications);
router.get('/unread-count', getUnreadCount);

export { router as notificationReadRoutes };