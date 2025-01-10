import './create-monster-form.scss';
import FormField from "../../components/Form/FormField";
import FormSubmit from "../../components/Form/FormSubmit";
import FormProvider from "../../context/FormProvider";
import { createMonsterSchema } from '../../services/requestValidators/createMonster';
import FormDropDown from '../../components/Form/FormDropDown';
import { ALIGNMENTS, BIOMES, CREATURE_SIZES, CREATURE_TYPES } from '../../assets/srdResources';
import { acValues, crDisplayArray } from '../../assets/monsterArrays';

export default function CreateMonsterForm() {
    return (
        <FormProvider schema={createMonsterSchema} handleSubmit={async (data) => {
            console.log(data);
            return true;
        }}>
            <FormDropDown name="biome" label="Biome" options={BIOMES} required />
            <FormDropDown name="CR" label="CR" options={crDisplayArray} required />
            <FormField name="name" placeholder="Name" ariaLabel="name" required />
            <FormDropDown name="size" label="Size" options={CREATURE_SIZES} required />
            <FormDropDown name="type" label="Type" options={CREATURE_TYPES} required />
            <FormDropDown name="alignment" label="Alignment" options={ALIGNMENTS} required />
            <FormDropDown name="armorClass" label="Armor Class" options={acValues} required />
            <FormField name="hitPoints" type="number" placeholder="Hit Points" ariaLabel="hit points" options={{ step: 1, min: 1, max: 1000000 }} required />
            <FormSubmit />
        </FormProvider>
    )
}
