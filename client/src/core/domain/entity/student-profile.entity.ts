import { z } from "zod";

export const StudentProfileSchema = z
  .object({
    id: z.number(),
    student_no: z.string(),
    academic_status: z.string().nullable(),
    academic_year: z.number().nullable(),
  })
  .optional();

export type StudentProfile = z.infer<typeof StudentProfileSchema>;
