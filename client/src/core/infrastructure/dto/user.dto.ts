import { UserSchema } from "@/core/domain/entity/user.entity";
import z from "zod";

export const UserSuccessDTOSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: UserSchema,
});

export const UserErrorDTOSchema = z.object({
  status: z.number(),
  message: z.string(),
});

export type UserSuccessDTO = z.infer<typeof UserSuccessDTOSchema>;
export type UserErrorDTO = z.infer<typeof UserErrorDTOSchema>;
