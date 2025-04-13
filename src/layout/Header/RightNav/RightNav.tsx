import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import './right-nav.scss';
import ROUTES from '../../../routes/routerModel';
import useRoles from '../../../hooks/useRoles';

export default function RightNav() {
    const navigate = useNavigate();
    const isLoggedIn = useRoles("user");

    return (
        <nav className="right-nav">
            {isLoggedIn ?
                <Button text="Profile" className="nav-button" onClick={() => navigate(ROUTES.ABOUT)} /> :
                <Button text="Signup" className="nav-button" onClick={() => navigate(ROUTES.SIGNUP)} />
            }
        </nav>
    )
}