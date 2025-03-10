import { AnyZodObject, ZodObject, ZodRawShape } from "zod";
import { ZodObjectPaths } from "../../types/zodTypes";
import { ChangeEvent, HTMLAttributes, InputHTMLAttributes, useCallback, useEffect } from "react";
import { useForm } from "../../context/FormProvider";
import Input from "../../components/Input/Input";

type FormFieldProps<T extends ZodObject<ZodRawShape>> = {
    target: ZodObjectPaths<T>;
    classNames?: {
        container?: string;
        label?: string;
        input?: string;
        errors?: string;
    }
    id: HTMLAttributes<HTMLInputElement>["id"];
    label: {
        text: string;
        isIdle?: "floatAbove" | "hidden" | "inline";
        isActive?: "floatAbove" | "hidden";
    }
    initialValue?: string;
    attributes?: InputHTMLAttributes<HTMLInputElement>;
    displayError?: "all" | "first" | "none" | ((errorMessages: string[]) => string);
}

export default function FormField<T extends ZodObject<ZodRawShape> = AnyZodObject>({ target, classNames, id, label, initialValue, attributes, displayError }: FormFieldProps<T>) {
    const { value, error, handleChange: form } = useForm<T>(target);

    useEffect(() => {
        if (initialValue) form(initialValue);
    }, []);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        form(e);
        if (attributes?.onChange) attributes.onChange(e);
    }, [form, attributes?.onChange]);

    useEffect(() => {
        console.log(`${id} errors are: ${error?.errors}`);
    }, [error?.errors]);
    useEffect(() => {
        console.log(`${id} value is: ${value}`);
    }, [value]);

    return (
        <Input
            classNames={classNames}
            id={id}
            label={label}
            attributes={{
                ...attributes,
                value,
                onChange: handleChange,
            }}
            error={{
                display: displayError,
                validators: error?.errors.map((issue) => ({
                    message: issue.message
                })) || []
            }}
        />
    )
}