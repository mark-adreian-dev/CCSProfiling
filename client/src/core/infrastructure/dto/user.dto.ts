import { UserSchema } from "@/core/domain/entity/user.entity";
import z from "zod";
import { PaginatedResponseSchema } from "./paginated-response.dto";
import { SuccessResponseDTOSchema } from "./success-response.dto";

export const UserSuccessDTOSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: UserSchema,
});

export const UserErrorDTOSchema = z.object({
  status: z.number(),
  message: z.string(),
});

export const PaginatedUserSchema = PaginatedResponseSchema.extend({
  content: z.array(UserSchema),
});

export const PaginatedUserResponseDTOSchema = SuccessResponseDTOSchema.extend({
  data: PaginatedUserSchema,
});

export type UserSuccessDTO = z.infer<typeof UserSuccessDTOSchema>;
export type UserErrorDTO = z.infer<typeof UserErrorDTOSchema>;
export type PaginatedUser = z.infer<typeof PaginatedUserSchema>;
export type PaginatedUserResponseDTO = z.infer<typeof PaginatedUserResponseDTOSchema>;
