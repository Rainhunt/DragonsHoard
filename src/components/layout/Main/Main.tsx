import React, { ReactNode } from 'react'
import './main.scss'

type MainProps = {
    children: ReactNode
    backgroundImage?: string
}

const Main: React.FC<MainProps> = ({ children, backgroundImage }) => {
    return (
        <main style={{ backgroundImage: `url(${backgroundImage})` }} >
            {children}
        </main >
    )
}

export default Main;