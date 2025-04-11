import './scroll.scss';
import { CSSProperties, ReactNode, useMemo } from "react";
import classNameConstructor from "../../utils/classNameConstructor";
import returnEmptyAsUndefined from '../../utils/returnEmptyAsUndefined';

type ScrollProps = {
    className?: string;
    children: ReactNode;
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
    padding?: CSSProperties["padding"];
    backgroundColor?: CSSProperties["backgroundColor"];
    barColor?: CSSProperties["backgroundColor"];
    flexDirection?: CSSProperties["flexDirection"];
    justifyContent?: CSSProperties["justifyContent"];
}

export default function Scroll({ className, children, width, height, padding, backgroundColor, barColor, flexDirection, justifyContent }: ScrollProps) {
    const containerClass = useMemo(() => classNameConstructor(
        "scroll-container",
        className
    ), [className]);

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
            <hr className="scroll-bar" style={barStyle} />
            <div className="scroll-body" style={bodyStyle}>
                {children}
            </div>
            <hr className="scroll-bar bottom-bar" style={barStyle} />
        </section>
    )
}