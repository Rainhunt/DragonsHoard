import { z } from "zod";
import { getUserSchema } from "./getUser";

export const getUsersSchema = z.array(getUserSchema);

export type GetUsersResponse = z.infer<typeof getUsersSchema>;