import React, { useEffect } from 'react'
import './home-page.scss'
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
            <h1>Dragon's Hoard</h1>
            <h2>The complete home of homebrew</h2>
        </>
    )
}

export default HomePage;