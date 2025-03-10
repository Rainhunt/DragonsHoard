import { ZodObject, ZodRawShape } from "zod";
import FormField from "./FormField";

export default function getFormComponents<T extends ZodObject<ZodRawShape>>() {
    return { FormField: FormField<T> }
}