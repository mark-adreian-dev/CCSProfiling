import { z } from "zod";

export const FacultyProfileSchema = z
  .object({
    id: z.number(),
    employee_no: z.string(),
    position: z.string().nullable(),
  })
  .optional();

export type FacultyProfile = z.infer<typeof FacultyProfileSchema>;
