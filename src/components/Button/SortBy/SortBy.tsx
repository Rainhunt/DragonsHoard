import './sort-by.scss'
import React, { MouseEventHandler } from 'react'
import Button from '../Button'

type SortByButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const SortByButton: React.FC<SortByButtonProps> = ({ onClick }) => {
    return (
        <Button className="sort-by-button" onClick={onClick} text={`\u25B2 \n \u25BC`} />
    )
}

export default SortByButton;