import z from "zod";

export const LoginRequestSchema = z.object({
  identification_id: z.string().min(1, "ID is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
