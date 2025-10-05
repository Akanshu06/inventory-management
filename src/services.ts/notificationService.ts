import { Notification, INotification, NotificationStatus, NotificationType } from '../models/Notification';
import { calculatePagination } from '../utils/helpers';

export class NotificationService {
  static async getNotifications(
    page: number = 1,
    limit: number = 20,
    type?: NotificationType,
    status?: NotificationStatus
  ) {
    const { skip } = calculatePagination(page, limit);
    
    const filter: any = {};
    
    if (type) {
      filter.type = type;
    }
    
    if (status) {
      filter.status = status;
    }

    const notifications = await Notification.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Notification.countDocuments(filter);
    const unreadCount = await Notification.countDocuments({ 
      ...filter,
      status: NotificationStatus.UNREAD 
    });

    return {
      notifications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      unreadCount
    };
  }

  static async markAsRead(notificationId: string): Promise<INotification> {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { status: NotificationStatus.READ },
      { new: true }
    );

    if (!notification) {
      throw new Error('Notification not found');
    }

    return notification;
  }

  static async markAllAsRead(): Promise<void> {
    await Notification.updateMany(
      { status: NotificationStatus.UNREAD },
      { status: NotificationStatus.READ }
    );
  }

  static async createLowStockNotification(
    product: any,
    location: any,
    currentStock: number,
    threshold: number
  ): Promise<INotification> {
    const notification = new Notification({
      type: NotificationType.LOW_STOCK,
      title: 'Low Stock Alert',
      message: `Product ${product.name} (${product.sku}) is running low on stock at ${location.name}. Current stock: ${currentStock}`,
      relatedId: product._id,
      data: {
        productId: product._id,
        productName: product.name,
        productSku: product.sku,
        locationId: location._id,
        locationName: location.name,
        currentStock,
        threshold
      }
    });

    return await notification.save();
  }

  static async getUnreadCount(): Promise<number> {
    return await Notification.countDocuments({ status: NotificationStatus.UNREAD });
  }
}