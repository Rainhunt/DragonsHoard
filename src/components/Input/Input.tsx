import './input.scss';
import { ChangeEvent, FocusEvent, HTMLAttributes, InputHTMLAttributes, useCallback, useMemo, useState } from "react";
import { ValidationError } from "../../types/feedbackTypes";
import camelToKebab from "../../utils/camelToKebab";
import classNameConstructor from "../../utils/classNameConstructor";

type InputProps = {
    classNames?: {
        container?: string;
        label?: string;
        input?: string;
        errors?: string;
    };
    id: HTMLAttributes<HTMLInputElement>["id"];
    label: {
        text: string;
        isIdle?: "floatAbove" | "hidden" | "inline";
        isActive?: "floatAbove" | "hidden";
    }
    attributes?: InputHTMLAttributes<HTMLInputElement>;
    error?: {
        display?: "all" | "first" | "none" | ((errorMessages: string[]) => string);
        validators: ValidationError<string>[];
        onValidationError?: (errors: ValidationError<string>[]) => void
    };
}

export default function Input({ classNames, id, label, attributes, error }: InputProps) {
    const [isIdle, setIsIdle] = useState(true);
    const [errors, setErrors] = useState<ValidationError<string>[]>([]);

    const containerClass = useMemo(() => classNameConstructor(
        "text-input-container",
        classNames?.container
    ), [classNames?.container]);
    const labelClass = useMemo(() => classNameConstructor(
        "text-input-label",
        classNames?.label,
        `text-input-label-${camelToKebab(isIdle ? label.isIdle || "inline" : label.isActive || "floatAbove")}`
    ), [classNames?.label, isIdle, label.isIdle, label.isActive]);
    const inputClass = useMemo(() => classNameConstructor(
        "text-input",
        classNames?.input
    ), [classNames?.input]);
    const errorCLass = useMemo(() => classNameConstructor(
        "text-input-errors",
        classNames?.errors
    ), [classNames?.errors]);

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

    return (
        <div className={containerClass}>
            <label htmlFor={id} className={labelClass}>
                {label.text}
            </label>
            <input
                {...attributes}
                id={id}
                className={inputClass}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            {error?.display !== "none" && errors.length > 0 &&
                <span className={errorCLass}>
                    {error?.display === "first" ?
                        errors[0].message :
                        typeof error?.display === "function" ? error.display(errors.map(error => error.message)) :
                            errors.map(error => error.message).join(", ")
                    }
                </span>}
        </div>
    )
}
