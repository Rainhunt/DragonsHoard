import React, { useState, CSSProperties, MouseEventHandler, useRef, useEffect } from 'react';
import './slider.scss';

type SliderProps = {
    values: string[]
    onChange?: (leftIndex: number, rightIndex: number) => void;
    className?: string;
    trackHeight?: CSSProperties["height"];
    thumbSize?: CSSProperties["width"];
    color?: CSSProperties["color"];
};

const Slider: React.FC<SliderProps> = ({ values, onChange, className, trackHeight, thumbSize }) => {
    const [leftIndex, setLeftIndex] = useState<number>(0);
    const [rightIndex, setRightIndex] = useState<number>(values.length - 1);

    const sliderRef = useRef<HTMLDivElement | null>(null);
    const handleThumbMove = (e: MouseEvent, thumbSide: "right" | "left") => {
        const slider = sliderRef.current;
        if (!slider) return;

        const sliderRect = slider.getBoundingClientRect();
        const offsetX = e.clientX - sliderRect.left;
        const newIndex = Math.round((offsetX / sliderRect.width) * (values.length - 1));

        if (newIndex >= 0 && newIndex < values.length) {
            if (thumbSide === "right") {
                if (newIndex > leftIndex) setRightIndex(newIndex);
            } else {
                if (newIndex < rightIndex) setLeftIndex(newIndex);
            }
        };
    }

    const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        const thumbSide = (e.target as HTMLDivElement).classList.contains("right-thumb") ? "right" : "left"

        document.body.style.userSelect = "none"
        const moveHandler = (event: MouseEvent) => handleThumbMove(event, thumbSide);
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', () => {
            document.body.style.userSelect = ""
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', () => { });
        });
    };

    const calculatePosition = (index: number) => {
        return values.length > 1 ? index / (values.length - 1) * 100 : 0;
    };

    useEffect(() => {
        if (onChange) {
            onChange(leftIndex, rightIndex);
        }
    }, [leftIndex, rightIndex, onChange]);

    return (
        <div className={`slider ${className || ""}`} ref={sliderRef}>
            <div className="slider-track" style={{ height: trackHeight, width: `calc(100% - ${thumbSize || 0})`, left: `calc(${thumbSize} / 2)` }}>
                <div
                    className="slider-range"
                    style={{
                        left: `calc(${calculatePosition(leftIndex)}% + ${thumbSize} / 2)`,
                        width: `calc(${calculatePosition(rightIndex) - calculatePosition(leftIndex)}% - ${thumbSize || 0})`,
                    }}
                />
            </div>
            <div
                className="slider-thumb left-thumb"
                style={{
                    left: `${calculatePosition(leftIndex)}%`,
                    width: thumbSize,
                }}
                onMouseDown={handleMouseDown}
            />
            <div
                className="slider-thumb right-thumb"
                style={{
                    left: `${calculatePosition(rightIndex)}%`,
                    width: thumbSize
                }}
                onMouseDown={handleMouseDown}
            />
            <div className="slider-values">
                <span>{values[leftIndex]}</span> - <span>{values[rightIndex]}</span>
            </div>
        </div>
    );
};

export default Slider;
