import z from "zod";

export const PaginationMetaDataSchema = z.object({
  total: z.number(),
  items_count: z.number(),
  per_page: z.number(),
  current_page: z.number(),
  total_pages: z.number(),
});

export const PaginatedNavigationSchema = z.object({
  has_more_pages: z.boolean(),
  has_prev_page: z.boolean(),
  next_page_num: z.number().nullable(),
  prev_page_num: z.number().nullable(),
});

export const PaginatedResponseSchema = z.object({
  pagination: PaginationMetaDataSchema,
  navigation: PaginatedNavigationSchema,
});

export type PaginatedResponse = z.infer<typeof PaginatedResponseSchema>;
export type PaginatedNavigation = z.infer<typeof PaginatedNavigationSchema>;
export type PaginationMetaData = z.infer<typeof PaginationMetaDataSchema>;
