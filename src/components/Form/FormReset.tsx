import './form.scss';
import Button from "../Button/Button";

interface FormResetProps {
    text?: string;
}

export default function FormReset({ text }: FormResetProps) {
    return (
        <Button className="form-reset-button" type="reset" text={text ?? "Reset"} />
    )
}
