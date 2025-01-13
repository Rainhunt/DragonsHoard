import './left-nav.scss';
import Button from '../../../Button/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../routes/routerModel';
import DropDownMenu from '../../../DropDownMenu/DropDownMenu';
import useBreakpoint from '../../../../hooks/useBreakpoints';
import { useMemo } from 'react';
import { useUser } from '../../../../context/UserProvider';

export default function LeftNav() {
    const navigate = useNavigate();
    const breakpoint = useBreakpoint();
    const { user } = useUser();
    const buttons = useMemo(() => {
        const dropDown = [
            <Button key="home" text="Home" onClick={() => navigate(ROUTES.ROOT)} />,
            <Button key="about" text="About" onClick={() => navigate(ROUTES.ABOUT)} />,
            <Button key="codex" text="Codex" onClick={() => navigate(ROUTES.CODEX)} />,
            <Button key="games" text="Games" />,
        ];
        const navBar = dropDown.splice(0, breakpoint === "phone" ? 0 : breakpoint === "tablet" ? 2 : 3);
        if (user) dropDown.push(
            <Button key="create" text="Create Monster" onClick={() => navigate(ROUTES.CREATE_MONSTER)} />,
            <Button key="myMonsters" text="My Monsters" onClick={() => navigate(ROUTES.MY_MONSTERS)} />
        );
        if (user?.isAdmin) dropDown.push(<Button key="manage" text="Manage Users" onClick={() => navigate(ROUTES.MANAGE_USERS)} />);
        return { dropDown, navBar }
    }, [breakpoint, user]);

    return (
        <div className="left-nav">
            <DropDownMenu label={"\u2630"} items={buttons.dropDown} left openOnHover />
            {buttons.navBar}
        </div>
    )
}
