import z from "zod";

export const InterestRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type InterestRequest = z.infer<typeof InterestRequestSchema>;
