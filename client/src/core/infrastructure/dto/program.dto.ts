import { ProgramSchema } from "@/core/domain/entity/program.entity";
import z from "zod";
import { PaginatedResponseSchema } from "./paginated-response.dto";
import { SuccessResponseDTOSchema } from "./success-response.dto";

export const ProgramSuccessDTOSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: ProgramSchema,
});

export const ProgramErrorDTOSchema = z.object({
  status: z.number(),
  message: z.string(),
});

export const PaginatedProgramSchema = PaginatedResponseSchema.extend({
  content: z.array(ProgramSchema),
});

export const PaginatedProgramResponseDTOSchema = SuccessResponseDTOSchema.extend({
  data: PaginatedProgramSchema,
});

export type ProgramSuccessDTO = z.infer<typeof ProgramSuccessDTOSchema>;
export type ProgramErrorDTO = z.infer<typeof ProgramErrorDTOSchema>;
export type PaginatedProgram = z.infer<typeof PaginatedProgramSchema>;
export type PaginatedProgramResponseDTO = z.infer<typeof PaginatedProgramResponseDTOSchema>;
