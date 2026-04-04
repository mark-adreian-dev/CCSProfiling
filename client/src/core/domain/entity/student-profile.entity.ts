import { z } from "zod";
import { ProgramSchema } from "./program.entity";

export const StudentProfileSchema = z.object({
  id: z.number(),
  student_no: z.string(),
  academic_year: z.number().nullable(),
  academic_status: z.string().nullable(),
  program: ProgramSchema.nullable(),
});

export type StudentProfile = z.infer<typeof StudentProfileSchema>;