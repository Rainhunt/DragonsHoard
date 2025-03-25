import { ChangeEvent, createContext, FormEvent, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnyZodObject, z, ZodAny, ZodError, ZodObject, ZodRawShape } from "zod";
import { ZodObjectPaths } from "../types/zodTypes";
import { getValueFromPath, setValueFromPath } from "../utils/stringPathIndexing";

type FormValue<T extends ZodObject<ZodRawShape> = AnyZodObject, R = unknown> = {
    isAwait: boolean;
    formData: Partial<z.infer<T>>;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string, path: ZodObjectPaths<T>) => void;
    isFormValid: boolean;
    errors: Record<string, ZodError>;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<R>;
    handleReset: () => void;
}

const FormContext = createContext<FormValue | null>(null);

type FormProviderProps<T extends ZodObject<ZodRawShape>, R> = {
    className: string;
    schema: ZodObject<ZodRawShape>;
    children: ReactNode;
    onSubmit: (formData: z.infer<T>, e?: FormEvent<HTMLFormElement>) => Promise<R>;
}

export function FormProvider<T extends ZodObject<ZodRawShape> = AnyZodObject, R = unknown>({ className, schema, children, onSubmit }: FormProviderProps<T, R>) {
    const [isAwait, setIsAwait] = useState(false);
    const [formData, setFormData] = useState<Partial<z.infer<typeof schema>>>({});
    const [isFormValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState<Record<string, ZodError>>({});

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string, target: string) => {
        const value = typeof e === "string" ? e : e.target.type === "checkbox" ? e.target.checked : e.target.value;
        const schemaPath = target.split(".").join(".shape.");
        const fieldSchema = getValueFromPath(schemaPath, schema) as ZodAny | undefined;

        if (!fieldSchema) {
            //error message: No field 'path' found
            console.log(`No field '${target}' found`);
        } else {
            setFormData(prev => {
                const data = { ...prev };
                setValueFromPath(target, value, data);
                return data;
            });
            try {
                fieldSchema.parse(value);
                setErrors(prev => {
                    const { [target]: _, ...rest } = prev;
                    return rest;
                });
            } catch (err) {
                if (err instanceof ZodError) {
                    setErrors(prev => ({
                        ...prev,
                        [target]: err
                    }));
                } else {
                    //error message: No field 'path' found
                    console.log(`No field '${target}' found`);
                }
            }
        }
    }, [schema]);

    useEffect(() => {
        try {
            schema.parse(formData);
            setIsValid(true)
        } catch (err) {
            setIsValid(false);
        }
    }, [schema, formData]);

    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormValid) {
            setIsAwait(true);
            const response = await onSubmit(formData, e);
            setIsAwait(false);
            return response;
        } else {
            //error message: Form is not valid
            console.log("Form failed validation");
        }
    }, [isFormValid, onSubmit, formData]);

    const handleReset = useCallback(() => {
        setFormData({});
        setErrors({});
    }, []);

    return (
        <FormContext.Provider value={{ isAwait, formData, handleChange, isFormValid, errors, handleSubmit, handleReset }}>
            <form className={className} onReset={handleReset} onSubmit={handleSubmit}>
                {children}
            </form>
        </FormContext.Provider>
    )
}

export function useForm<T extends ZodObject<ZodRawShape> = AnyZodObject, R = unknown>(): FormValue<T, R>;
export function useForm<T extends ZodObject<ZodRawShape> = AnyZodObject, R = unknown>(target: ZodObjectPaths<T>): {
    isAwait: boolean;
    formData: Partial<z.infer<T>>;
    value: string;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string) => void;
    isFormValid: boolean;
    errors: Record<string, ZodError>;
    error: ZodError | undefined;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<R>;
    handleReset: () => void;
};
export function useForm<T extends ZodObject<ZodRawShape> = AnyZodObject>(target?: ZodObjectPaths<T>) {
    const context = useContext<FormValue<T> | null>(FormContext);
    if (!context) {
        throw new Error("useForm must be used within a FormProvider");
    }
    if (!target) return context;
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string) => {
        context.handleChange(e, target);
    }, [context.handleChange, target]);
    const value = useMemo(() => {
        return getValueFromPath(target, context.formData) as string || "";
    }, [context.formData]);

    return { ...context, value: value, handleChange, error: context.errors[target] as ZodError | undefined };
}