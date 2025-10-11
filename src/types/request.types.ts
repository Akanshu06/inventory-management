import { Request } from 'express';
import { AuthUser } from './auth.types';

export interface CustomRequest extends Request {
  user?: AuthUser;
  file?: any;
  files?: any[];
}