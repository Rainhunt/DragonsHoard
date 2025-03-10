import './scroll.scss';
import { CSSProperties, ReactNode, useMemo } from "react";
import classNameConstructor from "../../utils/classNameConstructor";
import returnEmptyAsUndefined from '../../utils/returnEmptyAsUndefined';

type ScrollProps = {
    classNames?: {
        container?: string;
        bar?: string;
        body?: string;
    }
    children: ReactNode;
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
    padding?: CSSProperties["padding"];
    backgroundColor?: CSSProperties["backgroundColor"];
    barColor?: CSSProperties["backgroundColor"];
    flexDirection?: CSSProperties["flexDirection"];
    justifyContent?: CSSProperties["justifyContent"];
}

export default function Scroll({ classNames, children, width, height, padding, backgroundColor, barColor, flexDirection, justifyContent }: ScrollProps) {
    const containerClass = useMemo(() => classNameConstructor(
        "scroll-container",
        classNames?.container
    ), [classNames?.container]);
    const barClass = useMemo(() => classNameConstructor(
        "scroll-bar",
        classNames?.bar
    ), [classNames?.bar]);
    const bottomBarClass = useMemo(() => classNameConstructor(
        "bottom-bar",
        barClass
    ), [classNames?.bar]);
    const bodyClass = useMemo(() => classNameConstructor(
        "scroll-body",
        classNames?.body
    ), [classNames?.body]);

    const containerStyle = useMemo(() => {
        const style: CSSProperties = {};
        if (width !== undefined) style.width = width;
        return returnEmptyAsUndefined(style);
    }, [width]);
    const barStyle = useMemo(() => {
        const style: CSSProperties = {};
        if (barColor !== undefined) style.backgroundColor = barColor;
        return returnEmptyAsUndefined(style);
    }, [barColor]);
    const bodyStyle = useMemo(() => {
        const style: CSSProperties = {};
        if (height !== undefined) style.height = height;
        if (padding !== undefined) style.padding = padding;
        if (backgroundColor !== undefined) style.backgroundColor = backgroundColor;
        if (flexDirection !== undefined) style.flexDirection = flexDirection;
        if (justifyContent !== undefined) style.justifyContent = justifyContent;
        return returnEmptyAsUndefined(style);
    }, [height, padding, backgroundColor, flexDirection, justifyContent]);

    return (
        <section className={containerClass} style={containerStyle}>
            <hr className={barClass} style={barStyle} />
            <div className={bodyClass} style={bodyStyle}>
                {children}
            </div>
            <hr className={bottomBarClass} style={barStyle} />
        </section>
    )
}