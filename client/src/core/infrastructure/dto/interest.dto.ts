import { InterestSchema, InterestChartDataSchema } from "@/core/domain/entity/interest.entity";
import z from "zod";
import { PaginatedResponseSchema } from "./paginated-response.dto";
import { SuccessResponseDTOSchema } from "./success-response.dto";

export const InterestSuccessDTOSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: InterestSchema.nullable(),
});

export const InterestErrorDTOSchema = z.object({
  status: z.number(),
  message: z.string(),
});

export const PaginatedInterestSchema = PaginatedResponseSchema.extend({
  content: z.array(InterestSchema),
});

export const PaginatedInterestResponseDTOSchema = SuccessResponseDTOSchema.extend({
  data: PaginatedInterestSchema,
});

export const InterestChartDataSuccessDTOSchema = SuccessResponseDTOSchema.extend({
  data: InterestChartDataSchema,
});

export type InterestSuccessDTO = z.infer<typeof InterestSuccessDTOSchema>;
export type InterestErrorDTO = z.infer<typeof InterestErrorDTOSchema>;
export type PaginatedInterest = z.infer<typeof PaginatedInterestSchema>;
export type PaginatedInterestResponseDTO = z.infer<typeof PaginatedInterestResponseDTOSchema>;
export type InterestChartDataSuccessDTO = z.infer<typeof InterestChartDataSuccessDTOSchema>;
