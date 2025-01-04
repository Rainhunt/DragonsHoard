import './scrolling-container.scss'
import React, { ReactNode } from 'react'

export interface ListItem {
    id: string;
    node: ReactNode;
}

type ScrollingContainerProps = {
    items: ListItem[];
}

const ScrollingContainer: React.FC<ScrollingContainerProps> = ({ items }) => {
    return (
        <div className="scrolling-container">
            <ul className="scrolling-list">
                {items.length > 0 ? items.map((item) => (
                    <li className="scrolling-item" key={item.id}>
                        {item.node}
                    </li>
                )) : <li className="empty-container">Nothing Here</li>}
            </ul>
        </div>
    )
}

export default ScrollingContainer;