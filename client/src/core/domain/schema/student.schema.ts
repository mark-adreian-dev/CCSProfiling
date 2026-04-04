import z from "zod";
import { UserRequestSchema } from "./user.schema";
import { AcademicStatus } from "@/core/enums/academic-status.enum";

export const StudentRequestSchema = UserRequestSchema.extend({
  program_id: z.string(),
  academic_year: z.string(),
  academic_status: z.enum([AcademicStatus.IRREGULAR, AcademicStatus.REGULAR]),
});

export type StudentRequest = z.infer<typeof StudentRequestSchema>;
