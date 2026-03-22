import z from "zod";
import { UserRequestSchema } from "./user.schema";

export const FacultyRequestSchema = UserRequestSchema.extend({
  expertise: z
    .string()
    .min(1, "Expertise is required")
    .optional()
    .refine((val) => val !== null && val !== undefined, {
      message: "Expertise is required",
    }),
});

export type FacultyRequest = z.infer<typeof FacultyRequestSchema>;
