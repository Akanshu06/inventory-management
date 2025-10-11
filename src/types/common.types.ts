export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    pagination?: PaginationResponse;
    [key: string]: any;
  };
}

export type ObjectId = string;

export interface TimestampFields {
  createdAt: Date;
  updatedAt: Date;
}