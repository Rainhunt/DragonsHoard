import './form.scss';
import { useForm } from '../../context/FormProvider';
import { useEffect } from 'react';

interface FormFieldProps {
    name: string;
    type?: "text" | "password";
    required?: boolean
    placeholder?: string;
    ariaLabel?: string;
    className?: string;
}

export default function FormField({ name, type = "text", required, placeholder, ariaLabel, className }: FormFieldProps) {
    const { initializeField, data, handleChange, errors } = useForm();

    useEffect(() => {
        if (required) initializeField(name, placeholder);
    }, []);

    return (
        <div className="form-field-container">
            <input
                name={name}
                type={type}
                value={data[name as keyof typeof data] as string ?? ""}
                onChange={handleChange}
                placeholder={`${placeholder}${required ? "*" : ""}`}
                aria-label={ariaLabel}
                className={`form-field ${className}`}
            />
            <div className="form-field-errors">
                {errors[name] !== `Required field ${placeholder ? placeholder : name} is empty` && errors[name]}
            </div>
        </div>
    )
}
