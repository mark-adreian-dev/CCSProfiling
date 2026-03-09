import { z } from "zod";

export const StudentProfileSchema = z
  .object({
    id: z.number(),
    student_no: z.string(),
    course: z.string().nullable(),
    year_level: z.number().nullable(),
  })
  .optional();

export type StudentProfile = z.infer<typeof StudentProfileSchema>;
