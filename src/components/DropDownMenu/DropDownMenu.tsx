import './drop-down-menu.scss';
import React, { ReactNode, useCallback, useState } from 'react'

interface DropDownMenuBasics {
    label: string;
    items: ReactNode[];
    openOnHover?: boolean;
}

interface DropDownMenuLeft extends DropDownMenuBasics {
    left: boolean;
    right?: never;
}

interface DropDownMenuRight extends DropDownMenuBasics {
    right: boolean;
    left?: never;
}

type DropDownMenuProps = DropDownMenuLeft | DropDownMenuRight;

const DropDownMenu: React.FC<DropDownMenuProps> = ({ label, items, openOnHover, right }) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const handleClick = useCallback(() => {
        setIsMenuOpen(true);
    }, []);
    const handleLeave = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    return (
        <div className="drop-down-menu-container">
            <div className="drop-down-menu-label" onClick={handleClick} onMouseLeave={handleLeave}>{label}</div>
            <div className={`drop-down-menu-content ${openOnHover && "open-on-hover"} ${isMenuOpen && "is-open"}`} style={right ? { right: 0 } : { left: 0 }}>
                {items}
            </div>
        </div>
    )
}

export default DropDownMenu;