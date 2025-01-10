import './signup-page.scss';
import { useEffect } from "react";
import { useLayout } from "../../context/LayoutProvider";
import SignupForm from '../../forms/SignupForm/SignupForm';

export default function SignupPage() {
    const { setPagePerms, setBackgroundImage } = useLayout();
    useEffect(() => {
        setPagePerms("notLogged");
        setBackgroundImage("/background-placeholder.png");
    }, []);

    return (
        <div className="signup-page">
            <h1>Sign Up</h1>
            <SignupForm />
        </div>
    )
}