import { z } from "zod";

const signupRequestSchema = z.object({
    username: z.string().min(1, "Username is required").min(2, "Username must be at least 2 characters").max(32, "Username must be less than 32 characters"),
    email: z.string().min(1, "Email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "You must provide a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(20, "Password must be less than 20 characters long").regex(/(?=.*[a-z])(?=.*[A-Z])/, "Password must contain a lowercase and an uppercase letter").regex(/[!@#$%^&*\-]/, "Password must contain a symbol (!@#$%^&*\\-)")
});

export default signupRequestSchema;