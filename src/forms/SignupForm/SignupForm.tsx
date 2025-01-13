import './signup-form.scss';
import FormProvider from '../../context/FormProvider';
import { SignupRequest, signupSchema } from '../../services/requestValidators/signup';
import { useUser } from '../../context/UserProvider';
import { useLayout } from '../../context/LayoutProvider';
import FormField from '../../components/Form/FormField';
import FormSubmit from '../../components/Form/FormSubmit';
import FormReset from '../../components/Form/FormReset';
import { useCallback } from 'react';
import useSignUp from '../../services/userRequests/useSignup';

export default function SignupForm() {
    const signup = useSignUp();
    const { createSnack } = useLayout();
    const map = useCallback((signupForm: SignupRequest) => ({
        name: {
            first: signupForm.nameFirst,
            middle: signupForm.nameMiddle,
            last: signupForm.nameLast
        },
        email: signupForm.email,
        password: signupForm.password
    }), []);

    return (
        <FormProvider schema={signupSchema} map={map} handleSubmit={async (data) => {
            const signupError = await signup(data);
            if (signupError) createSnack({ id: Date.now(), time: 10, right: "10%", top: "10%", style: { backgroundColor: "#800000", color: "#F1E5D1", fontSize: "1.5rem" }, children: signupError });
            return true;
        }}>
            <FormReset />
            <div className="signup-name-container">
                <FormField name="nameFirst" placeholder="First Name" required />
                <FormField name="nameMiddle" placeholder="Middle Name" />
                <FormField name="nameLast" placeholder="Last Name" required />
            </div>
            <FormField name="email" placeholder="Email" required />
            <FormField name="password" type="password" placeholder="Password" required />
            <FormSubmit />
        </FormProvider>
    )
}
