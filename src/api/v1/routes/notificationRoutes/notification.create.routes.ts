import { Router } from 'express';
import { createNotification } from '../../controllors/notificationController/notification.create';

const router = Router();

router.post('/', createNotification);

export { router as notificationCreateRoutes };