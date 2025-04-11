import { z } from "zod";

export const monsterSchema = z.object({
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

export const monstersSchema = z.array(monsterSchema);

export type MonsterSchema = z.infer<typeof monsterSchema>;