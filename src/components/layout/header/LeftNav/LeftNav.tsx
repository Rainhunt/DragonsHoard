import './left-nav.scss'
import React from 'react'
import Button from '../../../Button/Button'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../../routes/routerModel'
import DropDownMenu from '../../../DropDownMenu/DropDownMenu'

const LeftNav: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <DropDownMenu label={"\u2630"} items={[<a>test 1</a>, <a>test 2</a>]} left openOnHover />
            <Button text="Home" onClick={() => navigate(ROUTES.ROOT)} />
            <Button text="Codex" onClick={() => navigate(ROUTES.CODEX)} />
            <Button text="Games" />
        </div>
    )
}

export default LeftNav;