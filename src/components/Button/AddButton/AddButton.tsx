import React, { MouseEventHandler } from 'react'
import Button from '../Button'
import './add-button.scss';

type AddButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement> | undefined
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
    return (
        <Button className="add-button" onClick={onClick} text="+" />
    )
}

export default AddButton;