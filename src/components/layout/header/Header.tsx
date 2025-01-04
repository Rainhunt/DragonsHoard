import './header.scss'
import React from 'react'
import LeftNav from './LeftNav/LeftNav'
import RightNav from './RightNav/RightNav'

const Header: React.FC = () => {
    return (
        <nav>
            <LeftNav />
            <RightNav />
        </nav>
    )
}

export default Header;