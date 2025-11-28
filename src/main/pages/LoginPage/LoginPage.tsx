import './login-page.scss';
import { useEffect } from "react";
import LoginForm from "../../forms/LoginForm/LoginForm";
import { useLayout } from "../../layout/Layout";

export default function LoginPage() {
    const { page } = useLayout();
    useEffect(() => {
        page.reset();
        page.offsetTop = "20vh";
        page.margins = "35%";
        page.backgroundImage = `url(${import.meta.env.BASE_URL}background-placeholder.png)`;
    }, []);

    return (
        <div className="login-page">
            <h1 className='login-header'>Login</h1>
            <LoginForm />
        </div>
    )
}