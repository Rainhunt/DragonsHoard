import './line-break.scss';
import styles from '../../styles/index.module.scss';
import { CSSProperties, useMemo } from "react";
import returnEmptyAsUndefined from '../../../utils/returnEmptyAsUndefined';

type LineBreakProps = {
    height?: CSSProperties["height"];
    margin?: CSSProperties["margin"];
    color?: CSSProperties["color"];
    fade?: "left" | "right";
    taper?: "left" | "right";
}

export default function LineBreak({ height = "5px", margin, color, taper, fade }: LineBreakProps) {
    const style = useMemo(() => {
        const style: CSSProperties = {};
        style.height = height;
        if (margin !== undefined) style.margin = margin;
        if (fade) {
            style.background = `linear-gradient(to ${fade}, ${color || styles.textLabel}, transparent 70%, transparent 100%)`
        } else if (color) style.backgroundColor = color;
        if (taper) style.clipPath = taper === "left" ? `polygon(0% 50%, 100% 0%, 100% 100%)` : `polygon(0% 0%, 100% 50%, 0% 100%)`;
        return returnEmptyAsUndefined(style);
    }, [height, margin, color, taper, fade]);

    return (
        <hr className="line-break" style={style} />
    )
}