import './signup-form.scss';
import { FormProvider } from "../../context/FormProvider";
import getFormComponents from "../components/getFormComponents";
import signupRequestSchema from "./signupRequestSchema";
import FormSubmit from '../components/FormSubmit/FormSubmit';

const { FormField } = getFormComponents<typeof signupRequestSchema>();

export default function SignupForm() {
    return (
        <FormProvider<typeof signupRequestSchema, void> className="signup-form" schema={signupRequestSchema} onSubmit={async (formData) => console.log(formData)}>
            <FormField target=".email" id="signupEmail" label={{
                text: "Email*"
            }} displayError="first" attributes={{ type: "email" }} />
            <FormField target=".username" id="signupUsername" label={{
                text: "Username*"
            }} displayError="first" />
            <FormField target=".password" id="signupPassword" label={{
                text: "Password*"
            }} displayError="first" attributes={{ type: "password" }} />
            <FormSubmit text="Submit" />
        </FormProvider>
    )
}