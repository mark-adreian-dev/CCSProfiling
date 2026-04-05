import { z } from "zod";

export const SubjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  course_code: z.string(),
  units: z.number(),
});

export const SemesterSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const AcademicYearSchema = z.object({
  id: z.number(),
  year_level: z.string(),
});

export const GradeItemSchema = z.object({
  id: z.number(),
  grade_value: z.string(), // backend returns "2.30" as string
  subject: SubjectSchema.nullable(),
  semester: SemesterSchema.nullable(),
  academic_year: AcademicYearSchema.nullable(),
});

export const GradesSchema = z.object({
  curriculum_id: z.number().nullable().optional(),
  curriculum_date_start: z.string().nullable().optional(),
  curriculum_date_end: z.string().nullable().optional(),
  grades: z.array(GradeItemSchema),
});

export type Subject = z.infer<typeof SubjectSchema>;
export type Semester = z.infer<typeof SemesterSchema>;
export type AcademicYear = z.infer<typeof AcademicYearSchema>;
export type GradeItem = z.infer<typeof GradeItemSchema>;
export type Grades = z.infer<typeof GradesSchema>;
