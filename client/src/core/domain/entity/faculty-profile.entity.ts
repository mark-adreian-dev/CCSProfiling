import { z } from "zod";

export const FacultyProfileSchema = z
  .object({
    id: z.number(),
    employee_no: z.string(),
    expertise: z.string(),
  })
  .optional();

export type FacultyProfile = z.infer<typeof FacultyProfileSchema>;
