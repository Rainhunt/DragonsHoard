import './add-button.scss'
import React, { MouseEventHandler } from 'react'
import Button from '../Button'

type AddButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
    return (
        <Button className="add-button" onClick={onClick} text="+" />
    )
}

export default AddButton;