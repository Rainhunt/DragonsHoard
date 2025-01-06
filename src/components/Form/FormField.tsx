import './form.scss';
import { useForm } from '../../context/FormProvider';

interface FormFieldProps {
    name: string;
    placeholder?: string;
    ariaLabel?: string;
    className?: string;
}

export default function FormField({ name, placeholder, ariaLabel, className }: FormFieldProps) {
    const { data, handleChange, errors } = useForm();

    return (
        <div className="form-field-container">
            <input
                name={name}
                type="text"
                value={data[name as keyof typeof data] as string ?? ""}
                onChange={handleChange}
                placeholder={placeholder}
                aria-label={ariaLabel}
                className={`form-field ${className}`}
            />
            <div className="form-field-errors">
                {errors[name]}
            </div>
        </div>
    )
}