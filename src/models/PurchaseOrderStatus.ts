import mongoose, { Schema, Document } from 'mongoose';

export enum PurchaseOrderStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  RECEIVED = 'received',
  CANCELLED = 'cancelled'
}

export interface IPurchaseOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  unitCost: number;
  receivedQuantity: number;
}

export interface IPurchaseOrder extends Document {
  poNumber: string;
  supplier: string;
  items: IPurchaseOrderItem[];
  status: PurchaseOrderStatus;
  totalAmount: number;
  expectedDelivery?: Date;
  receivedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PurchaseOrderItemSchema = new Schema({
  product: { 
    type: Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  unitCost: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  receivedQuantity: { 
    type: Number, 
    default: 0,
    min: 0 
  }
});

const PurchaseOrderSchema = new Schema({
  poNumber: { 
    type: String, 
    required: true, 
    unique: true,
    uppercase: true
  },
  supplier: { 
    type: String, 
    required: true 
  },
  items: [PurchaseOrderItemSchema],
  status: { 
    type: String, 
    enum: Object.values(PurchaseOrderStatus),
    default: PurchaseOrderStatus.DRAFT
  },
  totalAmount: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  expectedDelivery: { 
    type: Date 
  },
  receivedAt: { 
    type: Date 
  },
  notes: { 
    type: String 
  }
}, {
  timestamps: true
});

// Index for status and date queries
PurchaseOrderSchema.index({ status: 1 });
PurchaseOrderSchema.index({ createdAt: -1 });

export const PurchaseOrder = mongoose.model<IPurchaseOrder>('PurchaseOrder', PurchaseOrderSchema);