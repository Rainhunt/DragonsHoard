import { z } from "zod";

export const shortMonsterSchema = z.object({
    _id: z.string(),
    alignment: z.string(),
    biome: z.string(),
    CR: z.number(),
    hitPoints: z.object({
        max: z.number()
    }),
    name: z.string(),
    size: z.string(),
    type: z.string()
});

export const monstersSchema = z.array(shortMonsterSchema);

export type ShortMonsterSchema = z.infer<typeof shortMonsterSchema>;