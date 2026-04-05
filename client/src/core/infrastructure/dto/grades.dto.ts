import { CurriculumSchema } from "@/core/domain/entity/curriculum.entity";
import { GradesSchema } from "@/core/domain/entity/grades.entity";
import z from "zod";

export const GradesSuccessDTOSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: GradesSchema,
});

export const GradesErrorDTOSchema = z.object({
  status: z.number(),
  message: z.string(),
});

export const CurriculumSuccessDTOSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: CurriculumSchema,
});

export const CurriculumErrorDTOSchema = z.object({
  status: z.number(),
  message: z.string(),
});

export type GradesSuccessDTO = z.infer<typeof GradesSuccessDTOSchema>;
export type GradesErrorDTO = z.infer<typeof GradesErrorDTOSchema>;
export type CurriculumSuccessDTO = z.infer<typeof CurriculumSuccessDTOSchema>;
export type CurriculumErrorDTO = z.infer<typeof CurriculumErrorDTOSchema>;
