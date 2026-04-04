import { z } from "zod";
import { DepartmentSchema } from "./department.entity";

export const ProgramSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
  department_id: z.number(),
  description: z.string().nullable(),
  created_at: z.string(),
  department: z.union([z.string(), DepartmentSchema]).nullable(),
});

export type Program = z.infer<typeof ProgramSchema>;
