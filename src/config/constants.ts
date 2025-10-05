export const APP_CONSTANTS = {
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // Stock
  DEFAULT_LOW_STOCK_THRESHOLD: 5,
  MIN_STOCK_QUANTITY: 0,
  
  // File upload
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  
  // Notifications
  LOW_STOCK_CHECK_INTERVAL: 30 * 60 * 1000, // 30 minutes
};

export const ERROR_MESSAGES = {
  PRODUCT: {
    NOT_FOUND: 'Product not found',
    SKU_EXISTS: 'Product SKU already exists',
    INSUFFICIENT_STOCK: 'Insufficient stock available',
    NEGATIVE_STOCK: 'Stock quantity cannot be negative',
  },
  STOCK: {
    NOT_FOUND: 'Stock record not found',
    LOCATION_REQUIRED: 'Location is required for stock operations',
  },
  PURCHASE_ORDER: {
    NOT_FOUND: 'Purchase order not found',
    INVALID_STATUS: 'Invalid purchase order status transition',
  },
  CATEGORY: {
    NOT_FOUND: 'Category not found',
    HAS_PRODUCTS: 'Cannot delete category with associated products',
  },
};