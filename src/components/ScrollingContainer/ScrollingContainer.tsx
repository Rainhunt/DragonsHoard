import classNameConstructor from '../../utils/classNameConstructor';
import './scrolling-container.scss';
import { Key, ReactNode, useMemo } from "react";

type ScrollingContainerProps = {
    classNames?: {
        container?: string;
        list?: string;
        item?: string;
        emptyItem?: string;
    };
    items: { item: ReactNode, key: Key }[];
    onEmpty: ReactNode;
}

export default function ScrollingContainer({ classNames, items, onEmpty }: ScrollingContainerProps) {
    const containerClass = useMemo(() => classNameConstructor(
        "scrolling-container",
        classNames?.container
    ), [classNames?.container]);
    const listClass = useMemo(() => classNameConstructor(
        "scrolling-list",
        classNames?.list
    ), [classNames?.list]);
    const itemClass = useMemo(() => classNameConstructor(
        "scrolling-item",
        classNames?.item
    ), [classNames?.item]);
    const emptyItemClass = useMemo(() => classNameConstructor(
        "empty-item",
        classNames?.emptyItem
    ), [classNames?.emptyItem]);

    return (
        <div className={containerClass}>
            <ul className={listClass}>
                {items.length > 0 ? items.map((item) => (
                    <li className={itemClass} key={item.key}>
                        {item.item}
                    </li>
                )) : <li className={emptyItemClass}>{onEmpty}</li>}
            </ul>
        </div>
    )
}