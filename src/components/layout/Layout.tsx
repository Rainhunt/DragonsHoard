import { ReactNode } from 'react';
import Header from './header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

type LayoutProps = {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
