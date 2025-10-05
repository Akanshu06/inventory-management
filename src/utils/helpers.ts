import { APP_CONSTANTS } from '../config/constants';

export const generateSKU = (name: string, categoryCode: string): string => {
  const timestamp = Date.now().toString().slice(-4);
  const nameCode = name
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 3);
  
  const category = categoryCode.toUpperCase().slice(0, 3);
  
  return `${category}-${nameCode}-${timestamp}`;
};

export const generatePONumber = (): string => {
  const timestamp = Date.now().toString();
  return `PO-${timestamp.slice(-8)}`;
};

export const calculatePagination = (page: number = 1, limit: number = APP_CONSTANTS.DEFAULT_PAGE_SIZE) => {
  const pageNum = Math.max(1, parseInt(page.toString()));
  const limitNum = Math.min(APP_CONSTANTS.MAX_PAGE_SIZE, Math.max(1, parseInt(limit.toString())));
  const skip = (pageNum - 1) * limitNum;

  return { page: pageNum, limit: limitNum, skip };
};

export const formatResponse = (success: boolean, data: any, message?: string, meta?: any) => {
  return {
    success,
    message,
    data,
    ...(meta && { meta })
  };
};

export const isLowStock = (currentQuantity: number, threshold: number): boolean => {
  return currentQuantity <= threshold;
};