import { z } from "zod";

export const InterestSchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.string().nullable().optional(),
  deleted_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export type Interest = z.infer<typeof InterestSchema>;
