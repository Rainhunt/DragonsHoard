import './login-page.scss';
import { useEffect } from "react";
import { useLayout } from "../../context/LayoutProvider";
import LoginForm from "../../forms/LoginForm/LoginForm";

export default function LoginPage() {
    const { setPagePerms, setBackgroundImage, setMainMarginPx } = useLayout();
    useEffect(() => {
        setPagePerms("notLogged");
        setBackgroundImage("/background-placeholder.png");
        setMainMarginPx({
            desktop: "15%",
            tablet: "10%",
            phone: "7%"
        });
    }, []);

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Log In</h1>
                <LoginForm />
            </div>
        </div>
    )
}