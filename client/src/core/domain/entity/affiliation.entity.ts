import { z } from "zod";

export const AffiliationSchema = z.object({
  id: z.number(),
  user_id: z.number(),

  role: z.string(),
  affiliation_name: z.string(),
  description: z.string().nullable().optional(),

  date_start: z.string().nullable().optional(),
  date_end: z.string().nullable().optional(),

  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  deleted_at: z.string().nullable().optional(),
});

export type Affiliation = z.infer<typeof AffiliationSchema>;
