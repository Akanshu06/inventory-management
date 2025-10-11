import { Document } from 'mongoose';
import { ObjectId, TimestampFields } from './common.types';

export interface BaseDocument extends Document, TimestampFields {
  _id: ObjectId;
}

export interface DatabaseError extends Error {
  code?: number;
  keyValue?: Record<string, any>;
}