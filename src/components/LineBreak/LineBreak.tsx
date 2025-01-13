import './line-break.scss';
import { CSSProperties, useCallback } from 'react';

type LineBreakProps = {
    height?: CSSProperties["height"];
    margin?: CSSProperties["margin"];
    color?: CSSProperties["color"];
    taper?: boolean;
    fade?: boolean;
}

export default function LineBreak({ height = "5px", margin, color, taper, fade }: LineBreakProps) {
    const handleStyle = useCallback((): CSSProperties => {
        const style: CSSProperties = {};
        style.height = height;
        style.margin = margin;
        if (fade) {
            style.background = `linear-gradient(to right, ${color}, transparent 70%, transparent 100%)`
        } else if (color) style.backgroundColor = color;
        if (taper) style.clipPath = `polygon(0% 0%, 100% 50%, 0% 100%)`;
        return style;
    }, [height, margin, color, taper, fade]);

    return (
        <div className="line-break" style={handleStyle()}></div>
    )
}
