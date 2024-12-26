import React from 'react'
import Button from '../../../Button/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../routes/routerModel';

const LeftNav: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Button text="Drop Down" />
            <Button text="Home" onClick={() => navigate(ROUTES.ROOT)} />
            <Button text="Codex" onClick={() => navigate(ROUTES.CODEX)} />
            <Button text="Games" />
        </div>
    )
}

export default LeftNav;