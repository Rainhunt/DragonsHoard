import { useState } from "react"
import FormField from "../../../components/Form/FormField";
import Button from "../../../components/Button/Button";
import useFormUnion from "../../../hooks/useFormUnion";

type NumOrModifierArrayProps = {
    name: string;
    required?: boolean;
    placeholder?: string;
    ariaLabel?: string;
}

export default function NumOrModifierArray({ name, required, placeholder, ariaLabel }: NumOrModifierArrayProps) {
    const [isModifier, setIsModifier] = useState(false);
    const partial = useFormUnion(name, 'Hack (value) (source) asd')

    return (
        <div className="modifier-array-form-container">
            {isModifier ?
                <>
                    <FormField name={"value"} type="number" required={required} placeholder={`${placeholder} value`} ariaLabel={ariaLabel} partial={partial} />
                    <FormField name={"source"} required={required} placeholder={`${placeholder} source`} ariaLabel={ariaLabel} partial={partial} />
                </> :
                <>
                    <FormField name={name} type="number" required={required} placeholder={placeholder} ariaLabel={ariaLabel} />
                    <Button text="Advanced" onClick={() => setIsModifier((isModifier) => !isModifier)} />
                </>}
        </div>
    )
}
