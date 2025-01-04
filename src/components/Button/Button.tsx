import './button.scss'
import React, { MouseEventHandler } from 'react'

type ButtonProps = {
    text: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className = "classic-button" }) => {
    return (
        <button className={className} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;