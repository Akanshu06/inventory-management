import { PaginationQuery, ObjectId } from './common.types';

// Product Types
export interface CreateProductRequest {
  sku?: string;
  name: string;
  description: string;
  price: number;
  costPrice: number;
  images?: string[];
  category: ObjectId;
  variants?: ProductVariant[];
  lowStockThreshold?: number;
}

export interface ProductVariant {
  name: string;
  options: string[];
  additionalPrice?: number;
}