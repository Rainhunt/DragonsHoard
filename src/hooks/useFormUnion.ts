import { useEffect, useState } from "react";
import { useForm } from "../context/FormProvider"


/**
 * Allows multiple inputs to control the result of a single field on a form.
 * 
 * @param name where to map the union on the form schema.
 * @param template json of the resulting union. Names of partial fields must be enclosed in ().
 * @param required Optional. Sets the union's error to empty unless all partials are non-empty.
 * @param placeholder Optional. Display text for union.
 * @returns partial(). Insert into the partial option of form fields. 
 */
export default function useFormUnion(name: string, template: string, required?: boolean, placeholder?: string) {
    const { initializeField, handleChange } = useForm();
    const [templateArray] = useState(template.split(/[()]/).map((v, i) => i % 2 ? v : ""));
    const [value, setValue] = useState(template.split(/[()]/).map((v, i) => i % 2 ? "" : v));

    useEffect(() => {
        if (required && value.indexOf("") !== -1) initializeField(name, placeholder);
    }, [value]);

    return function partial(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const index = templateArray.indexOf(e.target.name);
        setValue((prev) => {
            const newValue = [...prev];
            newValue[index] = e.target.value;
            return newValue;
        })
        e.target.name = name;
        e.target.value = value.join();
        console.log(templateArray);
        console.log(value);

        // handleChange(e, true);
    }
}