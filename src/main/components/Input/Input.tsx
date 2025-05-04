import './input.scss';
import { ChangeEvent, FocusEvent, HTMLAttributes, InputHTMLAttributes, useCallback, useEffect, useMemo, useState } from "react";
import { ValidationError } from "../../types/feedbackTypes";
import camelToKebab from '../../../utils/camelToKebab';
import classNameConstructor from '../../../utils/classNameConstructor';

type InputProps = {
    className?: string;
    id: HTMLAttributes<HTMLInputElement>["id"];
    label: {
        text: string;
        isIdle?: "floatAbove" | "hidden" | "inline";
        isActive?: "floatAbove" | "hidden";
    };
    attributes?: InputHTMLAttributes<HTMLInputElement>;
    error?: {
        display?: "all" | "first" | "none" | ((errorMessages: string[]) => string);
        validators: ValidationError<string>[];
        onValidationError?: (errors: ValidationError<string>[]) => void
    };
}

export default function Input({ className, id, label, attributes, error }: InputProps) {
    const [isIdle, setIsIdle] = useState(true);
    const [errors, setErrors] = useState<ValidationError<string>[]>([]);

    const containerClass = useMemo(() => classNameConstructor(
        "text-input-container",
        className
    ), [className]);
    const labelClass = useMemo(() => classNameConstructor(
        "text-input-label",
        `text-input-label-${camelToKebab(isIdle ? label.isIdle || "inline" : label.isActive || "floatAbove")}`
    ), [isIdle, label.isIdle, label.isActive]);

    const handleFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
        setIsIdle(false);
        if (attributes?.onFocus) attributes.onFocus(e);
    }, [attributes?.onFocus]);
    const handleBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === "") setIsIdle(true);
        if (attributes?.onBlur) attributes.onBlur(e);
    }, [attributes?.onBlur]);
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setErrors(error.validators.filter(error => !error.condition || !error.condition(e.currentTarget.value)));
            if (error.onValidationError) error.onValidationError(errors);
        }
        if (attributes?.onChange) attributes.onChange(e);
    }, [error, errors, attributes?.onChange]);
    useEffect(() => {
        if (error) setErrors(error.validators.filter(error => {
            if (typeof attributes?.value === "string") {
                return !error.condition || !error.condition(attributes.value);
            }
        }));
        if (attributes?.value) {
            setIsIdle(false);
        } else {
            setIsIdle(true);
        }
    }, [attributes?.value]);

    return (
        <div className={containerClass}>
            <label htmlFor={id} className={labelClass}>
                {label.text}
            </label>
            <input
                {...attributes}
                id={id}
                className="text-input"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            {error?.display !== "none" && errors.length > 0 &&
                <span className="text-input-errors">
                    {error?.display === "first" ?
                        errors[0].message :
                        typeof error?.display === "function" ? error.display(errors.map(error => error.message)) :
                            errors.map(error => error.message).join(", ")
                    }
                </span>}
        </div>
    )
}
