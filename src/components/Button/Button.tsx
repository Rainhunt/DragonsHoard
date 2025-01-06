import './button.scss'
import React, { ButtonHTMLAttributes, MouseEventHandler } from 'react'

type ButtonProps = {
    text: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, type, onClick, disabled, className = "classic-button" }) => {
    return (
        <button disabled={disabled} className={className} type={type} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;