import { Request, Response } from 'express';
import { NotificationService } from '../../../../services/NotificationService';
import { formatResponse } from '../../../../utils/helpers';

export const createNotification = async (req: Request, res: Response) => {
  try {
    const notification = await NotificationService.createNotification(req.body);
    
    res.status(201).json(
      formatResponse(true, notification, 'Notification created successfully')
    );
  } catch (error: any) {
    res.status(400).json(
      formatResponse(false, null, error.message)
    );
  }
};