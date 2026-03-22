import { Sex } from "@/core/enums/sex.enum";
import z from "zod";

export const UserRequestSchema = z.object({
  email: z.email("Invalid email address"),
  name_prefix: z.string().optional(),
  first_name: z.string().min(1, "First name is required"),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, "Last name is required"),
  name_suffix: z.string().optional(),
  date_of_birth: z
    .date()
    .optional()
    .refine((val) => val !== null && val !== undefined, {
      message: "Please select your date of birth",
    }),

  sex: z.enum([Sex.MALE, Sex.FEMALE]),
  contact_number: z
    .string()
    .min(11, "Invalid Contact No.")
    .max(11, "Invalid Contact No.")
    .startsWith("0", "Contact number must start with 0")
    .regex(/^\d+$/, "Contact number must contain only digits"),

  address: z.string().min(1, "Address is required"),
  profile_picture: z
    .union([z.instanceof(File), z.string()])
    .nullable()
    .optional(),
});

export type UserRequest = z.infer<typeof UserRequestSchema>;
