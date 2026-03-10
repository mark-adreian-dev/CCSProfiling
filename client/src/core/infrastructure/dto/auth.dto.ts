import { UserSchema } from "@/core/domain/entity/user.entity";
import z from "zod";

const PickedUserSchema = UserSchema.pick({
  id: true,
  role: true,
  name_prefix: true,
  first_name: true,
  middle_name: true,
  last_name: true,
  name_suffix: true,
});

export const AuthSuccessDTOSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: PickedUserSchema.or(z.array(PickedUserSchema)),
});

export const AuthErrorDTOSchema = z.object({
  status: z.number(),
  message: z.string(),
});

export type AuthSuccessDTO = z.infer<typeof AuthSuccessDTOSchema>;
export type AuthErrorDTO = z.infer<typeof AuthErrorDTOSchema>;
