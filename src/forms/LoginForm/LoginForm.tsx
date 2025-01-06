import './login-form.scss';
import FormField from "../../components/Form/FormField";
import FormReset from "../../components/Form/FormReset";
import FormSubmit from "../../components/Form/FormSubmit";
import FormProvider from "../../context/FormProvider";
import { loginSchema } from "../../services/requestValidators/login";
import { useUser } from '../../context/UserProvider';

export default function LoginForm() {
    const { handleLogin } = useUser();
    return (
        <FormProvider schema={loginSchema} handleSubmit={async (data) => {
            handleLogin(data);
            return true;
        }}>
            <FormReset />
            <div className="login-fields">
                <FormField name="email" placeholder="Email" />
                <FormField name="password" placeholder="Password" />
            </div>
            <FormSubmit />
        </FormProvider>
    )
}
