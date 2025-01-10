import { z } from "zod";

export const signupSchema = z.object({
    nameFirst: z.string().min(2).max(256),
    nameMiddle: z.string().min(2).max(256).optional(),
    nameLast: z.string().min(2).max(256),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: "You must provide a valid email" }).min(1, { message: "Email is required" }),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/, { message: "Your password must be 8-20 characters long, contain an uppercase and lowercase letter, a number, and a symbol (!@#$%^&*-)" })
});

export type SignupRequest = z.infer<typeof signupSchema>;