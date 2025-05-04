import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import './right-nav.scss';
import ROUTES from '../../../routes/routerModel';
import useRoles from '../../../hooks/useRoles';
import DropDown from '../../../components/DropDown/DropDown';
import { useUser } from '../../../context/UserProvider';

export default function RightNav() {
    const navigate = useNavigate();
    const { logout } = useUser();
    const isLoggedIn = useRoles("user");

    return (
        <nav className="right-nav">
            {isLoggedIn ?
                <DropDown label={<span className="nav-button"><Button text="Profile" onClick={() => navigate(ROUTES.ABOUT)} /></span>} openOn="hover">
                    <Button text="Logout" className="nav-button" onClick={logout} />
                </DropDown> :
                <>
                    <Button text="Login" className="nav-button" onClick={() => navigate(ROUTES.LOGIN)} />
                    <Button text="Signup" className="nav-button" onClick={() => navigate(ROUTES.SIGNUP)} />
                </>
            }
        </nav>
    )
}