import { useEffect } from "react";
import { useForm } from "../../context/FormProvider";

interface FormDropDownProps {
    name: string;
    label: string;
    options: readonly string[] | readonly number[];
    required?: boolean;
}

export default function FormDropDown({ name, label, options, required }: FormDropDownProps) {
    const { initializeField, data, handleChange } = useForm();

    useEffect(() => {
        if (required) initializeField(name, label);
    }, []);

    return (
        <div className="form-drop-down-container">
            <select
                className="form-drop-down-select"
                name={name}
                id={name}
                value={data[name as keyof typeof data] as string ?? ""}
                onChange={(e) => {
                    handleChange(e);
                    if (required && e.target.value === "") initializeField(name, label);
                }}
            >
                <option className="form-drop-down-option" value=""></option>
                {options.map((option) => (
                    <option className="form-drop-down-option" key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <label className={`form-drop-down-label ${data[name as keyof typeof data] ? "form-drop-down-empty" : ""}`} htmlFor={name}>{label}{required ? "*" : ""}</label>
        </div>
    )
}
