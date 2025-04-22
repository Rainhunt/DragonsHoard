import './slider.scss';
import { CSSProperties, MouseEvent as MouseEventReact, useCallback, useEffect, useMemo, useRef, useState } from "react"
import classNameConstructor from "../../utils/classNameConstructor";

type SliderProps = {
    className?: string;
    thumbSize?: CSSProperties["width"];
    isSingle?: boolean;
    init?: { leftIndex?: number, rightIndex?: number };
    onChange?: (leftValue: string, rightValue: string, leftIndex?: number, rightIndex?: number, maxIndex?: number) => void;
} & OR<{ values: readonly string[] }, { min: number, max: number, step?: number }>;

export default function Slider({ className, thumbSize, values, min, max, step = 1, isSingle, init, onChange }: SliderProps) {
    const [leftIndex, setLeftIndex] = useState<number>(init?.leftIndex || 0);
    const [rightIndex, setRightIndex] = useState<number>(init?.rightIndex || 0);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const maxIndex = useMemo(() => values ? (values.length - 1) : (max - min) / step, [values, max, min, step]);

    const containerClass = useMemo(() => classNameConstructor(
        "slider-container",
        className
    ), [className]);

    const leftThumbClass = useMemo(() => classNameConstructor(
        "slider-thumb",
        "left-thumb",
        isSingle && "display-none",
    ), [isSingle]);

    const leftThumbPosition = useMemo(() => `calc((100% - ${thumbSize || "1rem"}) * ${leftIndex / maxIndex})`, [thumbSize, leftIndex, maxIndex]);
    const leftThumbStyle = useMemo(() => {
        const style: CSSProperties = {};
        style.width = thumbSize || "1rem";
        style.left = leftThumbPosition;
        return style;
    }, [thumbSize, leftThumbPosition]);
    const rightThumbPosition = useMemo(() => `calc((100% - ${thumbSize || "1rem"}) * ${rightIndex / maxIndex})`, [thumbSize, rightIndex, maxIndex]);
    const rightThumbStyle = useMemo(() => {
        const style: CSSProperties = {};
        style.width = thumbSize || "1rem";
        style.left = rightThumbPosition;
        return style;
    }, [thumbSize, rightThumbPosition]);
    const rangeStyle = useMemo(() => {
        const style: CSSProperties = {};
        style.width = `calc((100% - ${thumbSize || "1rem"}) * ${rightIndex / maxIndex - leftIndex / maxIndex} + ${thumbSize || "1rem"})`;
        style.left = leftThumbPosition;
        return style;
    }, [thumbSize, leftIndex, rightIndex, maxIndex, leftThumbPosition]);

    const handleMouseDown = useCallback((e: MouseEventReact<HTMLDivElement>) => {
        document.body.style.userSelect = "none";

        const slider = sliderRef.current;
        if (!slider) return;
        const sliderRect = slider.getBoundingClientRect();

        const thumbSide = e.currentTarget.classList.contains("right-thumb") ? "right" : "left";
        const thumbWidth = e.currentTarget.clientWidth;

        const handleMove = (e: MouseEvent) => {
            let offsetX = e.clientX - sliderRect.left;
            if (thumbSide === "right") offsetX -= thumbWidth;
            const newIndex = Math.round(offsetX / (sliderRect.width - thumbWidth) * maxIndex);
            const boundIndex = newIndex < 0 ? 0 : newIndex > maxIndex ? maxIndex : newIndex;
            if (thumbSide === "left") setLeftIndex(newIndex <= rightIndex ? boundIndex : rightIndex);
            if (thumbSide === "right") setRightIndex(leftIndex <= newIndex ? boundIndex : leftIndex);
        }

        const handleMouseUp = () => {
            document.body.style.userSelect = ""
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [values, min, max, step, rightIndex, leftIndex]);

    useEffect(() => {
        if (onChange) values ? onChange(values[leftIndex], values[rightIndex], leftIndex, rightIndex, maxIndex) :
            onChange((min + step * leftIndex).toString(), (min + step * rightIndex).toString());
    }, [onChange, leftIndex, rightIndex]);

    return (
        <div className={containerClass} ref={sliderRef}>
            <div className="slider-track">
                <div className="slider-range" style={rangeStyle} />
            </div>
            <div className={leftThumbClass} style={leftThumbStyle} onMouseDown={handleMouseDown} />
            <div className="slider-thumb right-thumb" style={rightThumbStyle} onMouseDown={handleMouseDown} />
        </div>
    )
}