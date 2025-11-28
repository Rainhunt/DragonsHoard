import './signup-page.scss';
import SignupForm from "../../forms/SignupForm/SignupForm";
import { useLayout } from '../../layout/Layout';
import { useEffect } from 'react';

export default function SignupPage() {
    const { page } = useLayout();
    useEffect(() => {
        page.reset();
        page.offsetTop = "20vh";
        page.margins = "35%";
        page.backgroundImage = `url(${import.meta.env.BASE_URL}background-placeholder.png)`;
    }, []);
    return (
        <div className="signup-page">
            <h1 className='signup-header'>Create an Account</h1>
            <SignupForm />
        </div>
    )
}
