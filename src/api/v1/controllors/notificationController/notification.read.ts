import { Request, Response } from 'express';
import { NotificationStatus, NotificationType } from '../../../../models/Notification';
import { NotificationService } from '../../../../services/NotificationService';
import { formatResponse } from '../../../../utils/helpers';

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { page, limit, type, status } = req.query;
    
    const result = await NotificationService.getNotifications(
      parseInt(page as string) || 1,
      parseInt(limit as string) || 20,
      type as NotificationType,
      status as NotificationStatus
    );

    res.json(
      formatResponse(true, result.notifications, 'Notifications retrieved successfully', {
        pagination: result.pagination,
        unreadCount: result.unreadCount
      })
    );
  } catch (error: any) {
    res.status(500).json(
      formatResponse(false, null, error.message)
    );
  }
};

export const getUnreadCount = async (req: Request, res: Response) => {
  try {
    const count = await NotificationService.getUnreadCount();

    res.json(
      formatResponse(true, { count }, 'Unread count retrieved successfully')
    );
  } catch (error: any) {
    res.status(500).json(
      formatResponse(false, null, error.message)
    );
  }
};