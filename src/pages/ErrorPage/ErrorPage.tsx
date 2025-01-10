import './error-page.scss'
import React, { useEffect } from 'react'
import Button from '../../components/Button/Button'
import { useLayout } from '../../context/LayoutProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/routerModel'

const ErrorPage: React.FC = () => {
    const { setPagePerms, setBackgroundImage, setMainMarginPx } = useLayout();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setBackgroundImage("/background-placeholder.png");
        setMainMarginPx(300);
    }, []);

    useEffect(() => {
        if (location.pathname === ROUTES.ROOT) setPagePerms("all");
    }, [location.pathname, setPagePerms]);

    return (
        <>
            <h1 className="error-header">Something Went Wrong</h1>
            <h2 className="error-subheader">It appears your map may have led you astray. Fear not, your adventure isn't over! Head back to your hometown and start a new journey!</h2>
            <Button className="to-home-error-button" text="Back to town" onClick={() => navigate(ROUTES.ROOT)} />
        </>
    )
}

export default ErrorPage;