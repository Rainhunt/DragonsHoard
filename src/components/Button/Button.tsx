import './button.scss';
import { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react"

type ButtonProps = {
    className?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    disabled?: ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
    onClick?: (e: MouseEvent) => void;
} & OR<{ text: string }, { children: ReactNode }>

export default function Button({ className, type, disabled, onClick, text, children }: ButtonProps) {
    return (
        <button className={className} type={type} disabled={disabled} onClick={onClick}>
            {children || text}
        </button>
    )
}