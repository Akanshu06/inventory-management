import mongoose, { Schema, Document } from 'mongoose';

export interface IStock extends Document {
  product: mongoose.Types.ObjectId;
  location: mongoose.Types.ObjectId;
  quantity: number;
  reserved: number;
  lowStockThreshold: number;
  lastRestocked: Date;
  createdAt: Date;
  updatedAt: Date;
}

const StockSchema = new Schema({
  product: { 
    type: Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  location: { 
    type: Schema.Types.ObjectId, 
    ref: 'Location', 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 0,
    default: 0
  },
  reserved: { 
    type: Number, 
    default: 0,
    min: 0
  },
  lowStockThreshold: { 
    type: Number, 
    default: 5 
  },
  lastRestocked: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

// Compound index for unique product-location combination
StockSchema.index({ product: 1, location: 1 }, { unique: true });

// Index for low stock queries
StockSchema.index({ quantity: 1, lowStockThreshold: 1 });

export const Stock = mongoose.model<IStock>('Stock', StockSchema);