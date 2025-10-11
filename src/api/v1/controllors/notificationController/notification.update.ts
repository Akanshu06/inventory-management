import { Request, Response } from 'express';
import { NotificationService } from '../../../../services/NotificationService';
import { formatResponse } from '../../../../utils/helpers';

export const markAsRead = async (req: Request, res: Response) => {
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
};

export const markAllAsRead = async (req: Request, res: Response) => {
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
};