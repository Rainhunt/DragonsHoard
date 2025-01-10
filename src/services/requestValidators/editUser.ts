import { z } from "zod";

export const editUserSchema = z.object({
    nameFirst: z.string().min(2).max(256),
    nameMiddle: z.string().min(2).max(256).optional(),
    nameLast: z.string().min(2).max(256),
});

export type EditUserRequest = z.infer<typeof editUserSchema>;