import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { TypeOf, ZodError, ZodObject, ZodRawShape, ZodType } from "zod";
import { useUser } from "./UserProvider";

interface FormContextType<T extends ZodObject<ZodRawShape>> {
    data: T;
    errors: Record<keyof T['shape'], string>;
    status: "rest" | "awaitResponse" | "receivedResponse" | "noResponse";
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    validateForm: () => boolean | TypeOf<T> | false;
    onSubmit: () => void;
    onReset: () => void;
}

const FormContext = createContext<FormContextType<any> | undefined>(undefined);

interface FormProviderProps<T extends ZodObject<ZodRawShape>> {
    schema: T;
    handleSubmit: (data: TypeOf<T>, token: string | undefined) => Promise<boolean>;
    children: ReactNode;
}

const FormProvider = <T extends ZodObject<ZodRawShape>>({ schema, handleSubmit, children }: FormProviderProps<T>) => {
    const { jwt } = useUser();

    const [data, setData] = useState<Partial<Zod.infer<typeof schema>>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<"rest" | "awaitResponse" | "receivedResponse" | "noResponse">("rest");

    const validateField = useCallback((name: string, value: string | boolean) => {
        try {
            const fieldSchema = schema.shape[name]
            fieldSchema.parse(value);
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors
            });
        } catch (err) {
            if (err instanceof ZodError) {
                setErrors((prev) => ({
                    ...prev,
                    [name]: err.errors[0].message
                }));
            }
        }
    }, [schema, setErrors]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        validateField(name, value);
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }, [validateField, setData]);

    const validateForm = useCallback(() => {
        try {
            const validatedData = schema.parse(data);
            return validatedData;
        } catch (err) {
            return false;
        }
    }, [schema, data]);

    const onSubmit = useCallback(() => {
        const submit = async () => {
            const validatedData = validateForm();
            if (validatedData) {
                setStatus("awaitResponse");
                const response = await handleSubmit(validatedData, jwt);
                setStatus(response ? "receivedResponse" : "noResponse");
            } else {
                console.log("Error submitting form: Data does not conform to schema");
            }
        }
        submit();
    }, [validateForm, setStatus, handleSubmit, data, jwt]);

    const onReset = useCallback(() => {
        setData({});
        setErrors({});
    }, [setData, setErrors]);

    return (
        <FormContext.Provider value={{ data, errors, status, handleChange, validateForm, onSubmit, onReset }}>
            <form onReset={onReset} onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}>
                {children}
            </form>
        </FormContext.Provider>
    )
}

export function useForm<T extends ZodObject<ZodRawShape>>(): FormContextType<T> {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useForm must be used within a FormProvider");
    } else {
        return context;
    }
}

export default FormProvider;