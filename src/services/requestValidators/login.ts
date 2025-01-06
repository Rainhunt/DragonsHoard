import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: "You must provide a valid email" }).min(1, { message: "Email is required" }),
    password: z.string()
})

export type LoginRequest = z.infer<typeof loginSchema>;