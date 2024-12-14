import React, { ReactNode } from 'react'
import './main.scss'
import { useLayout } from '../../../context/LayoutProvider'

type MainProps = {
    children: ReactNode
    backgroundImage?: string
}

const Main: React.FC<MainProps> = ({ children }) => {
    const { backgroundImage, mainMarginPx } = useLayout();
    return (
        <main style={{ padding: `0 ${mainMarginPx || 0}px`, backgroundImage: `url(${backgroundImage})` }} >
            {children}
        </main >
    )
}

export default Main;