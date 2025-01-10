import { z } from "zod";
import { ABILITY_SCORES, ALIGNMENTS, ARMOR_TYPES, BIOMES, CONDITIONS, CREATURE_SIZES, CREATURE_TYPES, DAMAGE_TYPES, LANGUAGES, SKILLS, SPEED_TYPES, TOOLS, WEAPON_TYPES } from "../../assets/srdResources";
import { crDisplayArray } from "../../assets/monsterArrays";

function numOrModifierArray(min = 1, max = 1000000) {
    return z.union([
        z.number().int().min(min).max(max),
        z.array(z.object({
            value: z.number().int().min(min).max(max),
            source: z.string().min(2).max(256)
        }))
    ]);
}

function enumArrayOrModifierArray(enumType: readonly [string, ...string[]]) {
    return z.array(z.union([
        z.enum(enumType),
        z.object({
            value: z.enum(enumType),
            source: z.string().min(2).max(256)
        })
    ]));
}

export const createMonsterSchema = z.object({
    biome: z.enum(BIOMES),
    CR: z.enum(crDisplayArray),
    name: z.string().min(2).max(256),
    size: z.enum(CREATURE_SIZES),
    type: z.enum(CREATURE_TYPES),
    alignment: z.enum(ALIGNMENTS),
    armorClass: numOrModifierArray(1, 40),
    hitPoints: numOrModifierArray(),
    speed: z.union([
        z.number().int().min(1).max(10000000),
        z.array(z.object({
            type: z.enum(SPEED_TYPES),
            base: numOrModifierArray()
        }))
    ]),
    CHA: numOrModifierArray(1, 100),
    CON: numOrModifierArray(1, 100),
    DEX: numOrModifierArray(1, 100),
    INT: numOrModifierArray(1, 100),
    STR: numOrModifierArray(1, 100),
    WIS: numOrModifierArray(1, 100),
    skills: enumArrayOrModifierArray(SKILLS).optional(),
    tools: enumArrayOrModifierArray(TOOLS).optional(),
    savingThrows: enumArrayOrModifierArray(ABILITY_SCORES).optional(),
    weapons: enumArrayOrModifierArray(WEAPON_TYPES).optional(),
    armor: enumArrayOrModifierArray(ARMOR_TYPES).optional(),
    languages: enumArrayOrModifierArray(LANGUAGES).optional(),
    resistances: enumArrayOrModifierArray(DAMAGE_TYPES).optional(),
    vulnerabilities: enumArrayOrModifierArray(DAMAGE_TYPES).optional(),
    immunities: enumArrayOrModifierArray(DAMAGE_TYPES).optional(),
    conditionImmunities: enumArrayOrModifierArray(CONDITIONS).optional()
});

export type CreateMonsterRequest = z.infer<typeof createMonsterSchema>;