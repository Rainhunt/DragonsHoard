import './button.scss';
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

interface ButtonPropBasics {
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
    className?: string;
}

interface ButtonTextProps extends ButtonPropBasics {
    text: string
    children?: never;
}

interface ButtonChildrenProps extends ButtonPropBasics {
    children: ReactNode;
    text?: never;
}

type ButtonProps = ButtonTextProps | ButtonChildrenProps;

export default function Button({ type, onClick, disabled, className, text, children }: ButtonProps) {
    return (
        <button type={type} onClick={onClick} disabled={disabled} className={`default ${className || ""}`}>
            {children || text}
        </button>
    )
}