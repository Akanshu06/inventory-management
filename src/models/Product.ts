import mongoose, { Schema, Document } from 'mongoose';

export interface IProductVariant {
  name: string;
  options: string[];
  additionalPrice?: number;
}

export interface IProduct extends Document {
  sku: string;
  name: string;
  description: string;
  price: number;
  costPrice: number;
  images: string[];
  category: mongoose.Types.ObjectId;
  variants?: IProductVariant[];
  isActive: boolean;
  lowStockThreshold: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductVariantSchema = new Schema({
  name: { type: String, required: true },
  options: [{ type: String, required: true }],
  additionalPrice: { type: Number, default: 0 }
});

const ProductSchema = new Schema({
  sku: { 
    type: String, 
    required: true, 
    unique: true,
    uppercase: true,
    trim: true
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  costPrice: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  images: [{ 
    type: String 
  }],
  category: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  variants: [ProductVariantSchema],
  isActive: { 
    type: Boolean, 
    default: true 
  },
  lowStockThreshold: { 
    type: Number, 
    default: 5 
  }
}, {
  timestamps: true
});

// Index for better query performance
ProductSchema.index({ sku: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ isActive: 1 });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);