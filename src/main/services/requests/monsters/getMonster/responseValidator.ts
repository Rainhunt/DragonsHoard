import { z } from "zod"

const numberModifier = z.object({
    value: z.number(),
    source: z.string()
});

const stringModifier = z.object({
    value: z.string(),
    source: z.string()
});

export const getMonsterResponseSchema = z.object({
    _id: z.string(),
    biome: z.string(),
    CR: z.number(),
    name: z.string(),
    size: z.string(),
    type: z.string(),
    alignment: z.string(),
    armorClass: z.object({
        value: z.number(),
        base: z.array(numberModifier),
        modifiers: z.array(numberModifier)
    }),
    hitPoints: z.object({
        sources: z.array(numberModifier),
        max: z.number()
    }),
    speed: z.array(z.object({
        type: z.string(),
        value: z.number(),
        base: z.array(numberModifier),
        modifiers: z.array(numberModifier)
    })),
    abilityScores: z.object({
        CHA: z.object({
            value: z.number(),
            base: z.array(numberModifier),
            modifiers: z.array(numberModifier)
        }),
        CON: z.object({
            value: z.number(),
            base: z.array(numberModifier),
            modifiers: z.array(numberModifier)
        }),
        DEX: z.object({
            value: z.number(),
            base: z.array(numberModifier),
            modifiers: z.array(numberModifier)
        }),
        INT: z.object({
            value: z.number(),
            base: z.array(numberModifier),
            modifiers: z.array(numberModifier)
        }),
        STR: z.object({
            value: z.number(),
            base: z.array(numberModifier),
            modifiers: z.array(numberModifier)
        }),
        WIS: z.object({
            value: z.number(),
            base: z.array(numberModifier),
            modifiers: z.array(numberModifier)
        })
    }),
    proficiencies: z.object({
        proficiencyBonus: z.number().optional(),
        skills: z.array(stringModifier),
        tools: z.array(stringModifier),
        savingThrows: z.array(stringModifier),
        weapons: z.array(stringModifier),
        armor: z.array(stringModifier),
        languages: z.array(stringModifier)
    }),
    abilities: z.array(z.string()),
    conditionImmunities: z.array(stringModifier),
    damageTypes: z.object({
        resistances: z.array(stringModifier),
        vulnerabilities: z.array(stringModifier),
        immunities: z.array(stringModifier)
    }),
    createdBy: z.string()
});

export type MonsterSchema = z.infer<typeof getMonsterResponseSchema>;