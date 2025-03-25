import './form-submit.scss';
import { AnyZodObject, ZodObject, ZodRawShape } from "zod";
import { useForm } from "../../../context/FormProvider";
import Button from "../../../components/Button/Button";
import { useMemo } from "react";
import classNameConstructor from "../../../utils/classNameConstructor";

type FormSubmitProps = {
    className?: string;
    text: string;
}

export default function FormSubmit<T extends ZodObject<ZodRawShape> = AnyZodObject>({ className, text }: FormSubmitProps) {
    const { isFormValid } = useForm<T>();

    const submitClass = useMemo(() => classNameConstructor(
        "form-submit",
        className
    ), [className]);

    return (
        <Button type="submit" className={submitClass} text={text} disabled={!isFormValid} />
    )
}