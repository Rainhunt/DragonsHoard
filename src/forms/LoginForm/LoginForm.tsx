import FormField from "../../components/Form/FormField";
import FormReset from "../../components/Form/FormReset";
import FormSubmit from "../../components/Form/FormSubmit";
import FormProvider from "../../context/FormProvider";
import { loginSchema } from "../../services/requestValidators/login";
import { useUser } from '../../context/UserProvider';
import { useLayout } from '../../context/LayoutProvider';

export default function LoginForm() {
    const { handleLogin } = useUser();
    const { createSnack } = useLayout();
    return (
        <FormProvider schema={loginSchema} handleSubmit={async (data) => {
            const logError = await handleLogin(data);
            if (logError) createSnack({ id: Date.now(), time: 10, right: "10%", top: "10%", style: { backgroundColor: "#800000", color: "#F1E5D1", fontSize: "1.5rem" }, children: logError });
            return true;
        }}>
            <FormReset />
            <FormField name="email" placeholder="Email" required />
            <FormField name="password" type="password" placeholder="Password" required />
            <FormSubmit />
        </FormProvider>
    )
}
