import React from 'react'
import Button from '../../../Button/Button'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../../routes/routerModel';

const RightNav: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Button text="Sign Up" />
            <Button text="Log In" onClick={() => { navigate(ROUTES.LOGIN) }} />
            <Button text="Profile Icon" />
        </div>
    )
}

export default RightNav;