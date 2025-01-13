import './main.scss';
import { ReactNode, useEffect, useMemo } from 'react';
import { useLayout } from '../../../context/LayoutProvider';
import { useUser } from '../../../context/UserProvider';
import ErrorPage from '../../../pages/ErrorPage/ErrorPage';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routerModel';
import useBreakpoint from '../../../hooks/useBreakpoints';

type MainProps = {
    children: ReactNode;
}

export default function Main({ children }: MainProps) {
    const { whitelist, backgroundImage, mainMarginPx, pagePerms } = useLayout();
    //page perms
    const { user } = useUser();
    const navigate = useNavigate();
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

    //page margins
    const activeBreakpoint = useBreakpoint();

    return (
        <main style={{ padding: `50px ${mainMarginPx[activeBreakpoint] || 0} 0`, backgroundImage: `url(${backgroundImage})` }} >
            {render}
        </main >
    )
}
