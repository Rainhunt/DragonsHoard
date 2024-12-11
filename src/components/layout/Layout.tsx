import React, { ReactNode } from 'react'
import Header from './header/Header';
import Main from './Main/Main';

type LayoutProps = {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <Main backgroundImage="./background-placeholder.png">
                {children}
            </Main>
        </>
    )
}

export default Layout;