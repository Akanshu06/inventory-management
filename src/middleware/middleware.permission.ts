import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from './middleware.auth';

export const authorize = (permissions: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required.'
        });
      }

      const userPermissions = req.user.permissions || [];
      const hasPermission = permissions.some(permission => 
        userPermissions.includes(permission)
      );

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: 'Insufficient permissions.'
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Permission check failed.'
      });
    }
  };
};