import './main.scss'
import React, { ReactNode, useEffect, useMemo } from 'react'
import { useLayout } from '../../../context/LayoutProvider'
import { useUser } from '../../../context/UserProvider';
import ErrorPage from '../../../pages/ErrorPage/ErrorPage';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routerModel';

type MainProps = {
    children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
    const { whitelist, backgroundImage, mainMarginPx, pagePerms } = useLayout();
    const navigate = useNavigate();
    const { user } = useUser();
    const render = useMemo(() => {
        switch (pagePerms) {
            case "all":
            case "notLogged":
                return children;
            case "user":
                return user ? children : <ErrorPage />
            case "whitelist":
                return user && (user.isAdmin || whitelist.includes(user._id)) ? children : <ErrorPage />;
            case "admin":
                return user?.isAdmin ? children : <ErrorPage />
            default:
                <ErrorPage />
        }
    }, [children, pagePerms, user]);

    useEffect(() => {
        if (pagePerms === "notLogged" && user && !user.isAdmin) {
            navigate(ROUTES.ROOT);
        }
    }, [pagePerms, user, navigate]);

    return (
        <main style={{ padding: `50px ${mainMarginPx || 0}px 0`, backgroundImage: `url(${backgroundImage})` }} >
            {render}
        </main >
    )
}

export default Main;