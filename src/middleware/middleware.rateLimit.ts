import { Request, Response, NextFunction } from 'express';

interface RateLimitOptions {
  windowMs: number;
  max: number;
  message?: string;
}

const requestCounts = new Map<string, { count: number; resetTime: number }>();

export const rateLimit = (options: RateLimitOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || 'unknown';
    const now = Date.now();
    const windowStart = now - options.windowMs;

    // Clean up old entries
    for (const [ip, data] of requestCounts.entries()) {
      if (data.resetTime < now) {
        requestCounts.delete(ip);
      }
    }

    const current = requestCounts.get(key);
    
    if (!current || current.resetTime < now) {
      requestCounts.set(key, {
        count: 1,
        resetTime: now + options.windowMs
      });
      return next();
    }

    if (current.count >= options.max) {
      return res.status(429).json({
        success: false,
        message: options.message || 'Too many requests, please try again later.'
      });
    }

    current.count++;
    next();
  };
};