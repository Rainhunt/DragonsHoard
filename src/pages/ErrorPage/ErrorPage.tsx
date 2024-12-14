import React, { useEffect } from 'react'
import Button from '../../components/Button/Button';
import './error-page.scss'
import { useLayout } from '../../context/LayoutProvider';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routerModel';

const ErrorPage: React.FC = () => {
    const { setBackgroundImage, setMainMarginPx } = useLayout();
    useEffect(() => {
        if (setBackgroundImage) {
            setBackgroundImage("./background-placeholder.png");
        }
        if (setMainMarginPx) {
            setMainMarginPx(300);
        }
    }, []);

    const navigate = useNavigate();
    return (
        <>
            <h1>Something Went Wrong</h1>
            <h2>It appears your map may have led you astray. Fear not, your adventure isn't over! Head back to your hometown and start a new journey!</h2>
            <Button text="Back to town" onClick={() => navigate(ROUTES.ROOT)} />
        </>
    )
}

export default ErrorPage;