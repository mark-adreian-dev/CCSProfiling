import z from "zod";

export const SuccessResponseDTOSchema = z.object({
  status: z.number(),
  message: z.string(),
});

export type SuccessResponse = z.infer<typeof SuccessResponseDTOSchema>;
