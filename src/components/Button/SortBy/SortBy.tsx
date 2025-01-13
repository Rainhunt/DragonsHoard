import './sort-by.scss';
import { MouseEventHandler } from 'react';
import Button from '../Button';

type SortByButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function SortBy({ onClick }: SortByButtonProps) {
    return (
        <Button className="sort-by-button" onClick={onClick} text={`\u25B2 \n \u25BC`} />
    )
}
