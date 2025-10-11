import path from 'path';
import { Request } from 'express';

// Simple file upload configuration without multer
export const upload = {
  single: (fieldName: string) => (req: Request, res: any, next: any) => {
    // Placeholder middleware - multer not installed
    next();
  },
  array: (fieldName: string) => (req: Request, res: any, next: any) => {
    // Placeholder middleware - multer not installed
    next();
  }
};