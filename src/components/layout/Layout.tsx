import React, { ReactNode } from 'react'
import Header from './header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'

type LayoutProps = {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <Main>
                {children}
            </Main>
            <Footer />
        </>
    )
}

export default Layout;