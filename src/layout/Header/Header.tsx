import './header.scss';
import { useEffect, useMemo, useState } from 'react';
import useScroll from '../../hooks/useScroll';
import LeftNav from './LeftNav/LeftNav';
import RightNav from './RightNav/RightNav';
import { useLayout } from '../Layout';
import classNameConstructor from '../../utils/classNameConstructor';

export default function Header() {
    const { theme } = useLayout();
    const scroll = useScroll();
    const [isHidden, setIsHidden] = useState(false);
    useEffect(() => {
        if (theme.hideHeaderOnScroll) {
            scroll.addScrollHandler("down", (y) => {
                if (y > 200) setIsHidden(true);
            }, { direction: "down", scrollDistance: 30 });
            scroll.addScrollHandler("up", () => {
                setIsHidden(false);
            }, { direction: "up" });
        } else {
            scroll.removeScrollHandler("down");
            scroll.removeScrollHandler("up");
        }
    }, [theme.hideHeaderOnScroll]);

    const headerClass = useMemo(() => classNameConstructor(
        "header",
        theme.hideHeaderOnScroll && isHidden && "hide-header"
    ), [theme.hideHeaderOnScroll, isHidden]);

    return (
        <header className={headerClass}>
            <LeftNav />
            <RightNav />
        </header>
    )
}