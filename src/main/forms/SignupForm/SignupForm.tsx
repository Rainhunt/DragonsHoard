import './signup-form.scss';
import { FormProvider } from "../../context/FormProvider";
import getFormComponents from "../components/getFormComponents";
import FormSubmit from '../components/FormSubmit/FormSubmit';
import { signupRequestSchema } from '../../services/requests/users/signup/requestValidator';
import useSignup from '../../services/requests/users/signup/signup';

const { FormField } = getFormComponents<typeof signupRequestSchema>();

export default function SignupForm() {
    const signup = useSignup();

    return (
        <FormProvider<typeof signupRequestSchema> className="signup-form" schema={signupRequestSchema} onSubmit={signup}>
            <FormField target=".username" id="signupUsername" label={{
                text: "Username*"
            }} displayError="first" />
            <FormField target=".email" id="signupEmail" label={{
                text: "Email*"
            }} displayError="first" attributes={{ type: "email" }} />
            <FormField target=".password" id="signupPassword" label={{
                text: "Password*"
            }} displayError="first" attributes={{ type: "password" }} />
            <FormSubmit text="Submit" />
        </FormProvider>
    )
}