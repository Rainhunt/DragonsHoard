import { FormProvider } from "../../context/FormProvider";
import getFormComponents from "../components/getFormComponents";
import signupRequestSchema from "./signupRequestSchema";

const { FormField } = getFormComponents<typeof signupRequestSchema>();

export default function SignupForm() {
    return (
        <FormProvider schema={signupRequestSchema} onSubmit={async (formData) => console.log(formData)}>
            <FormField target=".email" id="signupEmail" label={{
                text: "Email"
            }} displayError="first" />
            <FormField target=".email" id="signupEmail2" label={{
                text: "Email 2"
            }} displayError="first" />
            <FormField target=".username" id="signupUsername" label={{
                text: "Username"
            }} displayError="first" />
        </FormProvider>
    )
}