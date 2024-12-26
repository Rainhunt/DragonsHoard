import React, { useState } from 'react';
import './slider.scss';

interface Slider {
    min: number;
    max: number;
    step: number;
    isDouble?: boolean
}

const Slider: React.FC<Slider> = ({ min, max, step, isDouble }) => {
    const [leftValue, setLeftValue] = useState(min);
    const [rightValue, setRightValue] = useState(max);

    const handleLeftChange = isDouble ? (e: React.ChangeEvent<HTMLInputElement>) => {
        const leftValue = Math.min(parseInt(e.target.value), rightValue - step);
        setLeftValue(leftValue);
    } : (e: React.ChangeEvent<HTMLInputElement>) => {
        setLeftValue(parseInt(e.target.value));
    };

    const handleRightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rightValue = Math.max(parseInt(e.target.value), leftValue + step);
        setRightValue(rightValue);
    };

    return (
        <div className="slider-container" style={{ position: 'relative', width: '100%' }}>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={leftValue}
                onChange={handleLeftChange}
            />
            {isDouble && <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={rightValue}
                onChange={handleRightChange}
            />}
        </div>
    );
};

export default Slider;
