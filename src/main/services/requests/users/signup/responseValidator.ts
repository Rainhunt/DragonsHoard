import { z } from "zod";

export const signupResponseSchema = z.object({
    username: z.string(),
    email: z.string(),
    _id: z.string()
});