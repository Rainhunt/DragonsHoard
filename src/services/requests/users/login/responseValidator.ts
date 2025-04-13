import { jwtDecode } from "jwt-decode";
import { z } from "zod";

const userSchema = z.object({
    _id: z.string(),
    isAdmin: z.boolean()
});

export const userPayloadSchema = z.string().transform((jwt, ctx) => {
    try {
        return jwtDecode(jwt);
    } catch (err) {
        ctx.addIssue({
            code: "custom",
            message: "Invalid jwt token"
        });
        return z.NEVER;
    }
}).pipe(userSchema);

export type UserSchema = z.infer<typeof userSchema>;