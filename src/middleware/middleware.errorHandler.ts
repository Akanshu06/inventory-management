import { NextFunction, Request, Response } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';

  // Mongoose duplicate key error
  if (error.name === 'MongoServerError' && (error as any).code === 11000) {
    const field = Object.keys((error as any).keyValue)[0];
    message = `${field} already exists`;
    statusCode = 400;
  }

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const errors = Object.values((error as any).errors).map((err: any) => err.message);
    message = errors.join(', ');
    statusCode = 400;
  }

  // Mongoose cast error (invalid ObjectId)
  if (error.name === 'CastError') {
    message = 'Resource not found';
    statusCode = 404;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error: AppError = new Error(`Not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};