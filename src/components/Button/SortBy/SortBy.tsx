import React, { MouseEventHandler } from 'react'
import Button from '../Button'
import './sort-by.scss';

type SortByButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement> | undefined
}

const SortByButton: React.FC<SortByButtonProps> = ({ onClick }) => {
    return (
        <Button className="sort-by-button" onClick={onClick} text={`\u25B2 \n \u25BC`} />
    )
}

export default SortByButton;