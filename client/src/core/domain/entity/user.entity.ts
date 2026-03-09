import { z } from "zod";
import { Sex } from "../../enums/sex.enum";
import { Role } from "../../enums/roles.enums";
import { StudentProfileSchema } from "./student-profile.entity";
import { FacultyProfileSchema } from "./faculty-profile.entity";

export const UserSchema = z.object({
  id: z.number(),
  email: z.email(),
  role: z.enum([Role.ADMIN, Role.CHAIR, Role.DEAN, Role.FACULTY, Role.STUDENT]),
  department_id: z.number(),
  name_prefix: z.string().nullable(),
  first_name: z.string(),
  middle_name: z.string().nullable(),
  last_name: z.string(),
  name_suffix: z.string().nullable(),
  date_of_birth: z.string().transform((val) => new Date(val)),
  sex: z.enum([Sex.MALE, Sex.FEMALE]),
  contact_number: z.string(),
  address: z.string(),
  profile_picture: z.string().nullable(),
  studentProfile: StudentProfileSchema,
  facultyProfile: FacultyProfileSchema,
});

export type User = z.infer<typeof UserSchema>;
