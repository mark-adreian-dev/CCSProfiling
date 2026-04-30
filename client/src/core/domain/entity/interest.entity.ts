import { z } from "zod";

export const InterestSchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.string().nullable().optional(),
  deleted_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const InterestChartItemSchema = z.object({
  interest_name: z.string(),
  student: z.number().int(),
  faculty: z.number().int(),
  total: z.number().int(),
});

export const InterestChartDataSchema = z.array(InterestChartItemSchema);

export type Interest = z.infer<typeof InterestSchema>;
export type InterestChartItem = z.infer<typeof InterestChartItemSchema>;
export type InterestChartData = z.infer<typeof InterestChartDataSchema>;
