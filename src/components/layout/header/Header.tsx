import React from 'react'
import LeftNav from './LeftNav/LeftNav';
import RightNav from './RightNav/RightNav';
import './header.scss';

const Header: React.FC = () => {
    return (
        <nav>
            <LeftNav />
            <RightNav />
        </nav>
    )
}

export default Header;