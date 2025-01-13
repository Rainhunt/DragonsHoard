import styles from '../../styles/index.module.scss';
import FormField from "../../components/Form/FormField";
import FormSubmit from "../../components/Form/FormSubmit";
import FormProvider from "../../context/FormProvider";
import { CreateMonsterRequest, createMonsterSchema } from '../../services/requestValidators/createMonster';
import FormDropDown from '../../components/Form/FormDropDown';
import { ALIGNMENTS, BIOMES, CREATURE_SIZES, CREATURE_TYPES } from '../../assets/srdResources';
import { crDisplayArray, crValueArray } from '../../assets/monsterArrays';
import { useCallback } from "react";
import useCreateMonster from "../../services/monsterRequests/useCreateMonster";
import { useLayout } from "../../context/LayoutProvider";

export default function CreateMonsterForm() {
    const createMonster = useCreateMonster();
    const { createSnack } = useLayout();

    const map = useCallback((createMonsterForm: CreateMonsterRequest) => ({
        biome: createMonsterForm.biome,
        name: createMonsterForm.name,
        CR: crValueArray[crDisplayArray.indexOf(createMonsterForm.CR)],
        alignment: createMonsterForm.alignment,
        type: createMonsterForm.type,
        size: createMonsterForm.size,
        speed: createMonsterForm.speed,
        armorClass: createMonsterForm.armorClass,
        hitPoints: createMonsterForm.hitPoints,
        abilityScores: {
            CHA: createMonsterForm.CHA,
            CON: createMonsterForm.CON,
            DEX: createMonsterForm.DEX,
            INT: createMonsterForm.INT,
            STR: createMonsterForm.STR,
            WIS: createMonsterForm.WIS
        }
    }), []);

    return (
        <FormProvider schema={createMonsterSchema} map={map} handleSubmit={async (data) => {
            const createMonsterError = await createMonster(data);
            if (createMonsterError) createSnack({ id: Date.now(), time: 10, right: "10%", top: "10%", style: { backgroundColor: styles.textLabel, color: styles.backgroundParagraph, fontSize: "1.5rem" }, children: createMonsterError });
            return true;
        }}>
            <FormDropDown name="biome" label="Biome" options={BIOMES} required />
            <FormDropDown name="CR" label="CR" options={crDisplayArray} required />
            <FormField name="name" placeholder="Name" ariaLabel="name" required />
            <FormDropDown name="size" label="Size" options={CREATURE_SIZES} required />
            <FormDropDown name="type" label="Type" options={CREATURE_TYPES} required />
            <FormDropDown name="alignment" label="Alignment" options={ALIGNMENTS} required />
            <FormField name="armorClass" type="number" placeholder="Armor Class" ariaLabel="armor class" options={{ step: 1, min: 1, max: 40 }} required />
            <FormField name="hitPoints" type="number" placeholder="Hit Points" ariaLabel="hit points" options={{ step: 1, min: 1, max: 1000000 }} required />
            <FormField name="speed" type="number" placeholder="Speed" ariaLabel="speed" options={{ step: 1, min: 1, max: 1000000 }} required />
            <FormField name="CHA" type="number" placeholder="Charisma" ariaLabel="charisma" options={{ step: 1, min: 1, max: 100 }} required />
            <FormField name="CON" type="number" placeholder="Constitution" ariaLabel="constitution" options={{ step: 1, min: 1, max: 100 }} required />
            <FormField name="DEX" type="number" placeholder="Dexterity" ariaLabel="dexterity" options={{ step: 1, min: 1, max: 100 }} required />
            <FormField name="INT" type="number" placeholder="Intelligence" ariaLabel="intelligence" options={{ step: 1, min: 1, max: 100 }} required />
            <FormField name="STR" type="number" placeholder="Strength" ariaLabel="strength" options={{ step: 1, min: 1, max: 100 }} required />
            <FormField name="WIS" type="number" placeholder="Wisdom" ariaLabel="wisdom" options={{ step: 1, min: 1, max: 100 }} required />
            <FormSubmit />
        </FormProvider>
    )
}
