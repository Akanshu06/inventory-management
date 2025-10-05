import { Request, Response } from 'express';
import { NotificationService } from '../../../services/NotificationService';
import { formatResponse } from '../../../utils/helpers';

export class NotificationController {
  static async getNotifications(req: Request, res: Response) {
    try {
      const { page, limit, type, status } = req.query;
      
      const result = await NotificationService.getNotifications(
        parseInt(page as string) || 1,
        parseInt(limit as string) || 20,
        type as string,
        status as string
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
  }

  static async markAsRead(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const notification = await NotificationService.markAsRead(id);

      res.json(
        formatResponse(true, notification, 'Notification marked as read')
      );
    } catch (error: any) {
      res.status(400).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async markAllAsRead(req: Request, res: Response) {
    try {
      await NotificationService.markAllAsRead();

      res.json(
        formatResponse(true, null, 'All notifications marked as read')
      );
    } catch (error: any) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async getUnreadCount(req: Request, res: Response) {
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
  }
}