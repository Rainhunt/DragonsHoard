import React from 'react'
import './line-fade.scss'

type LineFadeProps = {
    color?: string
    fade?: boolean
}

const LineFade: React.FC<LineFadeProps> = ({ color, fade }) => {
    return (
        <div className="line-break" color={color}></div>
    )
}

export default LineFade;