import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import './right-nav.scss';
import ROUTES from '../../../routes/routerModel';

export default function RightNav() {
    const navigate = useNavigate();

    return (
        <nav className="left-nav">
            <Button key="signupButton" text="Signup" className="nav-button" onClick={() => navigate(ROUTES.SIGNUP)} />
        </nav>
    )
}