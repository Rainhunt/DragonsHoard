import './removable-item.scss'
import React, { MouseEventHandler } from 'react'

type RemovableItemProps = {
    text: string;
    removeItem: MouseEventHandler<HTMLButtonElement>;
}

const RemovableItem: React.FC<RemovableItemProps> = ({ text, removeItem }) => {
    return (
        <div className="removable-item">
            {text}
            <button className="close-button" onClick={removeItem}>
                {"\u00D7"}
            </button>
        </div>
    )
}

export default RemovableItem;