import { INotification, Notification, NotificationStatus, NotificationType } from '../models/Notification';

export class NotificationService {
  static async createNotification(notificationData: Partial<INotification>): Promise<INotification> {
    const notification = new Notification(notificationData);
    await notification.save();
    return notification;
  }

  static async getNotifications(
    page: number = 1,
    limit: number = 20,
    type?: NotificationType,
    status?: NotificationStatus
  ) {
    const skip = (page - 1) * limit;
    const filter: any = {};
    
    if (type) {
      filter.type = type;
    }
    
    if (status) {
      filter.status = status;
    }

    const totalCount = await Notification.countDocuments(filter);
    const unreadCount = await Notification.countDocuments({ status: NotificationStatus.UNREAD });
    
    const notifications = await Notification.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return {
      notifications,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        itemsPerPage: limit
      },
      unreadCount
    };
  }

  static async markAsRead(notificationId: string): Promise<INotification | null> {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { status: NotificationStatus.READ },
      { new: true }
    );
    return notification;
  }

  static async getUnreadCount(): Promise<number> {
    return await Notification.countDocuments({ status: NotificationStatus.UNREAD });
  }

  static async markAllAsRead(): Promise<void> {
    await Notification.updateMany(
      { status: NotificationStatus.UNREAD },
      { status: NotificationStatus.READ }
    );
  }

  static async createStockNotification(
    type: NotificationType,
    productId: string,
    message: string
  ): Promise<INotification> {
    const notification = await this.createNotification({
      type,
      title: type === NotificationType.LOW_STOCK ? 'Low Stock Alert' : 'Stock Expiry Alert',
      message,
      relatedId: productId as any,
      status: NotificationStatus.UNREAD
    });

    return notification;
  }
}