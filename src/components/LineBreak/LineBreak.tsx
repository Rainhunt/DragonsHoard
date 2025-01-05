import './line-break.scss'
import { CSSProperties } from 'react'

type LineBreakProps = {
    color?: CSSProperties["color"];
    taper?: boolean;
    fade?: boolean;
}

const LineBreak: React.FC<LineBreakProps> = ({ color, taper, fade }) => {
    const handleStyle = (): CSSProperties => {
        const style: CSSProperties = {};
        if (fade) {
            style.background = `linear-gradient(to right, ${color}, transparent 70%, transparent 100%)`
        } else if (color) style.backgroundColor = color;
        if (taper) style.clipPath = `polygon(0% 0%, 100% 50%, 0% 100%)`;
        return style;
    }
    return (
        <div className="line-break" style={handleStyle()}></div>
    )
}

export default LineBreak;