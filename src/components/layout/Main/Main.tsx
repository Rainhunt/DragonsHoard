import './main.scss'
import React, { ReactNode } from 'react'
import { useLayout } from '../../../context/LayoutProvider'

type MainProps = {
    children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
    const { backgroundImage, mainMarginPx } = useLayout();
    return (
        <main style={{ padding: `50px ${mainMarginPx || 0}px 0`, backgroundImage: `url(${backgroundImage})` }} >
            {children}
        </main >
    )
}

export default Main;