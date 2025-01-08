import './form.scss';
import Button from "../Button/Button";
import { useForm } from '../../context/FormProvider';
import ToolTip from '../ToolTip/ToolTip';

interface FormSubmitProps {
    text?: string;
}

export default function FormSubmit({ text }: FormSubmitProps) {
    const { errors } = useForm();
    return (
        <ToolTip className="form-submit-tip" tooltip={errors[Object.keys(errors)[0]]} disabled={Object.keys(errors).length === 0} left>
            <Button
                className="form-submit-button"
                type="submit"
                text={text ?? "Submit"}
                disabled={Object.keys(errors).length !== 0}
            />
        </ToolTip>
    )
}
