import './login-page.scss';
import { useEffect } from "react";
import { useLayout } from "../../context/LayoutProvider";
import LoginForm from "../../forms/LoginForm/LoginForm";

export default function LoginPage() {
    const { setPagePerms, setBackgroundImage } = useLayout();
    useEffect(() => {
        setPagePerms("notLogged");
        setBackgroundImage("/background-placeholder.png");
    }, []);

    return (
        <div className="login-page">
            <h1>Log In</h1>
            <LoginForm />
        </div>
    )
}