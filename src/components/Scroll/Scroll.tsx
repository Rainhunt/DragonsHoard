import './scroll.scss';
import React, { CSSProperties, ReactNode } from 'react'

type ScrollProps = {
    width: CSSProperties["width"];
    height?: CSSProperties["height"];
    padding?: CSSProperties["padding"];
    backgroundColor?: CSSProperties["backgroundColor"];
    children: ReactNode
    classNames?: {
        body?: string;
        border?: string;
        container?: string;
    };
}

const Scroll: React.FC<ScrollProps> = ({ width, height, padding = 20, backgroundColor, children, classNames }) => {
    return (
        <section className={`scroll ${classNames?.container || ""}`} style={{ width: width }}>
            <hr className={`scroll-border ${classNames?.border || ""}`} />
            <div className={`scroll-body ${classNames?.body || ""}`} style={{ height: height, padding: padding, backgroundColor: backgroundColor }}>
                {children}
            </div>
            <hr className={`scroll-border ${classNames?.border || ""}`} />
        </section>
    )
}

export default Scroll;