import './add-button.scss';
import { MouseEventHandler } from 'react';
import Button from '../Button';

type AddButtonProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function AddButton({ onClick }: AddButtonProps) {
    return (
        <Button className="add-button" onClick={onClick} text="+" />
    )
}
