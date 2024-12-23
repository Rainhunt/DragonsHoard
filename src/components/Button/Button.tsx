import React, { MouseEventHandler } from 'react'
import './button.scss'

type ButtonProps = {
    text: string,
    onClick?: MouseEventHandler<HTMLButtonElement>
    className?: string
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
    return (
        <button className={className || "classic-button"} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;