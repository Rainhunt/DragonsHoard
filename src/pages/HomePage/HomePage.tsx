import './home-page.scss'
import React, { useEffect } from 'react'
import { useLayout } from '../../context/LayoutProvider'

const HomePage: React.FC = () => {
    const { setBackgroundImage } = useLayout();
    useEffect(() => {
        if (setBackgroundImage) {
            setBackgroundImage("./background-placeholder.png")
        }
    }, [])

    return (
        <>
            <h1 className="home-header">Dragon's Hoard</h1>
            <h2 className="home-subheader">The complete home of homebrew</h2>
        </>
    )
}

export default HomePage;