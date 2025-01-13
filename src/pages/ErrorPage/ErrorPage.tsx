import './error-page.scss'
import React, { useEffect } from 'react'
import Button from '../../components/Button/Button'
import { useLayout } from '../../context/LayoutProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/routerModel'

const ErrorPage: React.FC = () => {
    const { setPagePerms, lastPath, setLastPath, setBackgroundImage, setMainMarginPx } = useLayout();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setBackgroundImage("/background-placeholder.png");
        setMainMarginPx({
            desktop: "15%",
            tablet: "10%",
            phone: "7%"
        });
    }, []);

    useEffect(() => {
        if (location.pathname !== lastPath) {
            setPagePerms("all");
            setLastPath(location.pathname);
        }
    }, [location.pathname]);

    return (
        <div className="error-page">
            <h1 className="error-header">Something Went Wrong</h1>
            <h2 className="error-subheader">It appears your map may have led you astray. Fear not, your adventure isn't over! Head back to your hometown and start a new journey!</h2>
            <Button className="to-home-error-button" text="Back to town" onClick={() => navigate(ROUTES.ROOT)} />
        </div>
    )
}

export default ErrorPage;