import { z } from "zod";
import { Sex } from "../../enums/sex.enum";
import { Role } from "../../enums/roles.enums";
import { StudentProfileSchema } from "./student-profile.entity";
import { FacultyProfileSchema } from "./faculty-profile.entity";
import { InterestSchema } from "./interest.entity";
import { AffiliationSchema } from "./affiliation.entity";

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
  created_at: z.string(),
  interests: z.array(InterestSchema).optional().nullable(),
  studentProfile: StudentProfileSchema.optional(),
  facultyProfile: FacultyProfileSchema.optional(),
  affiliations: z.array(AffiliationSchema),
});

export type User = z.infer<typeof UserSchema>;
