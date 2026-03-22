export const OrderBy = {
  ASCENDING: "asc",
  DESCENDING: "desc",
} as const;

export type OrderBy = (typeof OrderBy)[keyof typeof OrderBy];
