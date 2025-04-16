import { z } from "zod";

export const loginRequestSchema = z.object({
    email: z.string().min(1, "Email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "You must provide a valid email"),
    password: z.string().min(1)
});

export type LoginSchema = z.infer<typeof loginRequestSchema>;