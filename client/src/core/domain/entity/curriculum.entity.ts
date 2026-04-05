import { z } from "zod";

// 1. Subject Schema
export const CurriculumSubjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  units: z.number(),
  course_code: z.string(),
});

// 2. Semester Schema
export const CurriculumSemesterSchema = z.object({
  id: z.number(),
  name: z.string(),
  subjects: z.array(CurriculumSubjectSchema),
});

// 3. Academic Year Schema
export const CurriculumAcademicYearSchema = z.object({
  id: z.number(),
  academic_year: z.string(),
  semesters: z.array(CurriculumSemesterSchema),
});

// 4. The Root Schema (The array of academic years)
export const CurriculumSchema = z.array(CurriculumAcademicYearSchema);

// Optional: Extract the TypeScript Type from the schema
export type Curriculum = z.infer<typeof CurriculumSchema>;
export type CurriculumAcademicYear = z.infer<typeof CurriculumAcademicYearSchema>;
export type CurriculumSemester = z.infer<typeof CurriculumSemesterSchema>;
export type CurriculumSubject = z.infer<typeof CurriculumSubjectSchema>;
