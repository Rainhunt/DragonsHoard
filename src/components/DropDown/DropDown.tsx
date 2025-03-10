import './drop-down.scss';
import useClickGlobal from '../../hooks/useClickGlobal';
import { createElement, ReactElement, ReactNode, useCallback, useMemo, useRef, useState } from "react";
import classNameConstructor from '../../utils/classNameConstructor';
import { PositionAlign } from '../../types/styleTypes';

export type DropDownProps = {
    label: ReactElement;
    children: ReactNode;
    openOn: "click" | "hover";
    closeOn?: "click-on" | "click-off" | "click-any" | "hover-off" | "click-or-hover-off";
} & OR<{ column?: boolean }, { row?: boolean }> & PositionAlign;

export default function DropDown({ label, children, openOn, closeOn, position = "bottom", align = "left", row }: DropDownProps) {
    const ref = useRef<HTMLElement>(null);
    const [isOpened, setIsOpened] = useState(false);

    //classes
    const labelClass = useMemo(() => classNameConstructor(
        "drop-down-label",
        label.props.className,
        isOpened && "drop-down-open",
        `drop-down-${position}`
    ), [label.props.className, isOpened]);
    const listClass = useMemo(() => classNameConstructor(
        "drop-down-list",
        `drop-down-position-${position}`,
        `drop-down-align-${align}`,
        !row && "drop-down-column"
    ), [position, align, row]);

    //callbacks
    const handleToggleCallback = useCallback(() => setIsOpened((prev) => !prev), []);
    const handleOpenCallback = useCallback(() => setIsOpened(true), []);
    const handleCloseCallback = useCallback(() => setIsOpened(false), []);

    //openOn
    const handleClick = useMemo(() => [handleToggleCallback, handleToggleCallback, handleOpenCallback, undefined, handleCloseCallback, undefined] //lookup table
    [(openOn === "click" ? 0 : 3) + (closeOn === undefined ? 0 : closeOn === "click-on" || closeOn === "click-or-hover-off" ? 1 : 2)], [openOn, closeOn]); //index
    const handleHover = useMemo(() => openOn === "click" ? undefined : handleOpenCallback, [openOn]);

    //closeOn
    const handleUnhover = useMemo(() => closeOn !== undefined && closeOn !== "hover-off" && closeOn !== "click-or-hover-off" ? undefined : handleCloseCallback, [closeOn]);
    if (closeOn === "click-any") {
        useClickGlobal(handleCloseCallback);
    } else if (closeOn === "click-off") {
        useClickGlobal(handleCloseCallback, ref);
    }

    return (
        <>
            {createElement(label.type,
                {
                    ...label.props,
                    ref: ref,
                    onClick: handleClick,
                    onMouseEnter: handleHover,
                    onMouseLeave: handleUnhover,
                    className: labelClass
                },
                <>
                    {label.props.children}
                    <div className={listClass}>
                        {children}
                    </div>
                </>
            )}
        </>
    )
}