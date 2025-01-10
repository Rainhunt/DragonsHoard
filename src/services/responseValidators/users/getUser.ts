import { ReactNode } from "react";
import { z } from "zod";

export const getUserSchema = z.object({
    name: z.object({
        first: z.string(),
        middle: z.string().optional(),
        last: z.string()
    }),
    email: z.string(),
    _id: z.string()
}).transform(data => ({
    firstName: data.name.first,
    middleName: data.name.middle,
    lastName: data.name.last,
    email: data.email,
    _id: data._id,
    edit: undefined as ReactNode | undefined,
    view: undefined as ReactNode | undefined
}));

export type GetUserResponse = z.infer<typeof getUserSchema>;