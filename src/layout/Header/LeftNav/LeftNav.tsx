import { useMemo } from 'react';
import Button from '../../../components/Button/Button';
import DropDown from '../../../components/DropDown/DropDown';
import './left-nav.scss';
import useBreakpoints from '../../../hooks/useBreakpoints';
import partitionArray from '../../../utils/partitionArray';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../routes/routerModel';

export default function LeftNav() {
    const navigate = useNavigate();
    const breakpoint = useBreakpoints();

    const buttons = useMemo(() => {
        const { pass: dropDown, reject: navBar } = partitionArray([
            <Button key="home" text="Home" className="nav-button" onClick={() => navigate(ROUTES.HOME)} />,
            <Button key="about" text="About" className="nav-button" onClick={() => navigate(ROUTES.ABOUT)} />,
            <Button key="monsters" text="Monsters" className="nav-button" onClick={() => navigate(ROUTES.MONSTERS)} />,
        ], (_, index) => {
            switch (breakpoint) {
                case "wideScreen":
                    return false;
                case "desktop":
                    return false;
                case "laptop":
                    return false;
                case "tablet":
                    return true;
                case "mobile":
                    return true;
                default:
                    return true;
            }
        });
        return { dropDown, navBar }
    }, [breakpoint]);
    return (
        <nav className="left-nav">
            <DropDown label={<div className="left-nav-hamburger">{"\u2630"}</div>} openOn="hover">
                {buttons.dropDown}
            </DropDown>
            {buttons.navBar}
        </nav>
    )
}