import { z } from "zod";

export const DepartmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
  contact_number: z.string().nullable(),
  email: z.string().nullable(),
  established_date: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  chair_id: z.number().nullable(),
});

export type Department = z.infer<typeof DepartmentSchema>;
