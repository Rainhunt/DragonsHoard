import './login-form.scss';
import { FormProvider } from "../../context/FormProvider";
import { loginRequestSchema } from "../../services/requests/users/login/requestValidator";
import FormSubmit from "../components/FormSubmit/FormSubmit";
import getFormComponents from "../components/getFormComponents";
import useLogin from '../../services/requests/users/login/useLogin';

const { FormField } = getFormComponents<typeof loginRequestSchema>();

export default function LoginForm() {
    return (
        <FormProvider<typeof loginRequestSchema> className="login-form" schema={loginRequestSchema} onSubmit={useLogin}>
            <FormField target=".email" id="loginEmail" label={{
                text: "Email*"
            }} displayError="first" attributes={{ type: "email" }} />
            <FormField target=".password" id="signupPassword" label={{
                text: "Password*"
            }} displayError="first" attributes={{ type: "password" }} />
            <FormSubmit text="Submit" />
        </FormProvider>
    )
}