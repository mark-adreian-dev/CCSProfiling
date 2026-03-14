import { Role } from "@/core/enums/roles.enums";
import { Sex } from "@/core/enums/sex.enum";
import z from "zod";
import { FacultyProfileSchema } from "../entity/faculty-profile.entity";
import { StudentProfileSchema } from "../entity/student-profile.entity";

export const FacultyRequestSchema = z.object({
  email: z.email("Invalid email address"),
  role: z.enum([Role.ADMIN, Role.CHAIR, Role.DEAN, Role.FACULTY, Role.STUDENT], "Invalid Role"),
  department_id: z.number(""),
  name_prefix: z.string().nullable(),
  first_name: z.string().min(1, "First name is required"),
  middle_name: z.string().nullable(),
  last_name: z.string().min(1, "Last name is required"),
  name_suffix: z.string().nullable(),
  date_of_birth: z.string().transform((val) => new Date(val)),
  sex: z.enum([Sex.MALE, Sex.FEMALE]),
  contact_number: z.string(),
  address: z.string(),
  profile_picture: z.string().nullable(),
  created_at: z.string(),
  studentProfile: StudentProfileSchema,
  facultyProfile: FacultyProfileSchema,
});

export type FacultyRequest = z.infer<typeof FacultyRequestSchema>;
