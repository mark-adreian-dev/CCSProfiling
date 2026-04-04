import z from "zod";

export const AffiliationRequestSchema = z.object({
  user_id: z.number(),
  role: z.string().min(1, "Role is required"),
  affiliation_name: z.string().min(1, "Affiliation name is required"),
  description: z.string().nullable().optional(),
  unParsedDescription: z.string().min(1, "Description is required"),
  date_start: z.date().nullable().optional(),
  date_end: z.date().nullable().optional(),
});

export type AffiliationRequest = z.infer<typeof AffiliationRequestSchema>;
