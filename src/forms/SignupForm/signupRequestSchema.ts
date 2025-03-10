import { z } from "zod";

const signupRequestSchema = z.object({
    username: z.string().min(2, "Username is required").max(32, "Username must be less than 32 characters"),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "You must provide a valid email").min(1, "Email is required"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/, "Your password must be 8-20 characters long, contain an uppercase and lowercase letter, a number, and a symbol (!@#$%^&*-)")
});

export default signupRequestSchema;