import type { OrderBy } from "@/core/enums/order.enum";

export interface PaginationParams<T extends Record<string, unknown>> {
  page: number;
  pageSize: number;
  order: OrderBy;
  sortBy: keyof T;
  search: string;
}
