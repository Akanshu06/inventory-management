import mongoose, { Schema, Document } from 'mongoose';

export enum NotificationType {
  LOW_STOCK = 'low_stock',
  EXPIRED_STOCK = 'expired_stock',
  PURCHASE_ORDER = 'purchase_order'
}

export enum NotificationStatus {
  UNREAD = 'unread',
  READ = 'read'
}

export interface INotification extends Document {
  type: NotificationType;
  title: string;
  message: string;
  relatedId?: mongoose.Types.ObjectId;
  status: NotificationStatus;
  data?: any;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema({
  type: { 
    type: String, 
    enum: Object.values(NotificationType),
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  relatedId: { 
    type: Schema.Types.ObjectId 
  },
  status: { 
    type: String, 
    enum: Object.values(NotificationStatus),
    default: NotificationStatus.UNREAD 
  },
  data: { 
    type: Schema.Types.Mixed 
  }
}, {
  timestamps: true
});

// Index for status and type queries
NotificationSchema.index({ status: 1 });
NotificationSchema.index({ type: 1 });
NotificationSchema.index({ createdAt: -1 });

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);