import { z } from "zod"

export const userPayloadSchema = z.object({
    _id: z.string(),
    isAdmin: z.boolean()
});


export type UserPayload = z.infer<typeof userPayloadSchema>;