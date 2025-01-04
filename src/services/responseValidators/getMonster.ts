import { ReactNode } from "react"
import { z } from "zod"

export const monsterSchema = z.object({
    _id: z.string(),
    biome: z.string(),
    CR: z.number(),
    name: z.string(),
    size: z.string(),
    type: z.string(),
    alignment: z.string(),
    hitPoints: z.object({
        current: z.number()
    }).transform((hitPoints) => hitPoints.current),
    view: z.custom<ReactNode>().optional()
});

export const monstersSchema = z.array(monsterSchema);

export type Monster = z.infer<typeof monsterSchema>;