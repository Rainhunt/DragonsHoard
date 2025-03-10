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
            <Button key="home" text="Home" className="nav-button" onClick={() => navigate(ROUTES.HOME)} />
        ], (value, index) => {
            switch (breakpoint) {
                case "wideScreen":
                    return index <= 1;
                case "desktop":
                    return false;
                default:
                    return false;
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