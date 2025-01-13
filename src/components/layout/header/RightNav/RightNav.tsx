import Button from '../../../Button/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../routes/routerModel';
import { useUser } from '../../../../context/UserProvider';
import ProfileIcon from './ProfileIcon/ProfileIcon';

export default function RightNav() {
    const navigate = useNavigate();
    const { jwt } = useUser();

    return (
        <>
            {jwt ?
                <div>
                    <ProfileIcon />
                </div> :
                <div>
                    <Button text="Sign Up" onClick={() => { navigate(ROUTES.SIGNUP) }} />
                    <Button text="Log In" onClick={() => { navigate(ROUTES.LOGIN) }} />
                </div>
            }
        </>
    )
}
