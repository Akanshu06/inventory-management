import mongoose, { Document, Schema } from 'mongoose';

export enum PurchaseOrderStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED'
}

export interface IPurchaseOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  unitCost: number;
  totalCost: number;
  receivedQuantity?: number;
}

export interface IPurchaseOrder extends Document {
  poNumber: string;
  supplier: string;
  items: IPurchaseOrderItem[];
  status: PurchaseOrderStatus;
  totalAmount: number;
  expectedDelivery?: Date;
  actualDelivery?: Date;
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
  totalCost: {
    type: Number,
    min: 0
  }
});

PurchaseOrderItemSchema.pre('save', function() {
  this.totalCost = this.quantity * this.unitCost;
});

const PurchaseOrderSchema = new Schema({
  poNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  supplier: {
    type: String,
    required: true,
    trim: true
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
  expectedDelivery: Date,
  actualDelivery: Date,
  notes: String
}, {
  timestamps: true
});

PurchaseOrderSchema.index({ status: 1 });
PurchaseOrderSchema.index({ supplier: 1 });

export const PurchaseOrder = mongoose.model<IPurchaseOrder>('PurchaseOrder', PurchaseOrderSchema);