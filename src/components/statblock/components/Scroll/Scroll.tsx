import React, { CSSProperties, ReactNode } from 'react'
import './scroll.scss';

type ScrollProps = {
    width: CSSProperties["width"];
    height?: CSSProperties["height"];
    padding?: CSSProperties["padding"];
    children: ReactNode
}

const Scroll: React.FC<ScrollProps> = ({ width, height, padding, children }) => {
    return (
        <section className="scroll" style={{ width: width }}>
            <hr className="scroll-border" />
            <div className="scroll-body" style={{ height: height, padding: padding || 20 }}>
                {children}
            </div>
            <hr className="scroll-border" />
        </section>
    )
}

export default Scroll;