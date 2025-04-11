import classNameConstructor from '../../utils/classNameConstructor';
import './scrolling-container.scss';
import { Key, ReactNode, useMemo } from "react";

type ScrollingContainerProps = {
    className?: string;
    items: { item: ReactNode, key: Key }[];
    onEmpty: ReactNode;
}

export default function ScrollingContainer({ className, items, onEmpty }: ScrollingContainerProps) {
    const containerClass = useMemo(() => classNameConstructor(
        "scrolling-container",
        className
    ), [className]);

    return (
        <div className={containerClass}>
            <ul className="scrolling-list">
                {items.length > 0 ? items.map((item) => (
                    <li className="scrolling-item" key={item.key}>
                        {item.item}
                    </li>
                )) : <li className="empty-item">{onEmpty}</li>}
            </ul>
        </div>
    )
}