import React, { MouseEventHandler } from 'react'
import './button.scss'

type ButtonProps = {
    text: string,
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;