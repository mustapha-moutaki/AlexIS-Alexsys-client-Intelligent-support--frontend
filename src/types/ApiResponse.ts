export interface ApiResponse<T>{
    success: boolean;
    message: string;
    data: T;
    timestamp: string;
    status: number;
    path: string;

}

export type PaginatedResponse<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
};