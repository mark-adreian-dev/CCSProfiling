import { AffiliationSchema } from "@/core/domain/entity/affiliation.entity";
import z from "zod";

export const AffiliationSuccessDTOSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: AffiliationSchema.nullable(),
});

export const AffiliationErrorDTOSchema = z.object({
  status: z.number(),
  message: z.string(),
});

export type AffiliationSuccessDTO = z.infer<typeof AffiliationSuccessDTOSchema>;
export type AffiliationErrorDTO = z.infer<typeof AffiliationErrorDTOSchema>;
