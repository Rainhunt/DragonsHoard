import './scroll.scss'
import React, { CSSProperties, ReactNode } from 'react'

type ScrollProps = {
    width: CSSProperties["width"];
    height?: CSSProperties["height"];
    padding?: CSSProperties["padding"];
    backgroundColor?: CSSProperties["backgroundColor"];
    children: ReactNode
    className?: string;
}

const Scroll: React.FC<ScrollProps> = ({ width, height, padding = 20, backgroundColor, children, className }) => {
    return (
        <section className={`scroll ${className}`} style={{ width: width }}>
            <hr className="scroll-border" />
            <div className="scroll-body" style={{ height: height, padding: padding, backgroundColor: backgroundColor }}>
                {children}
            </div>
            <hr className="scroll-border" />
        </section>
    )
}

export default Scroll;