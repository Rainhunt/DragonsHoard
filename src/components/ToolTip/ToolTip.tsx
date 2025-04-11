import './tooltip.scss';
import { CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Position } from "../../types/styleTypes";
import classNameConstructor from "../../utils/classNameConstructor";

type TooltipProps = {
    className?: string;
    children: ReactNode;
    tooltip: ReactNode;
    disabled?: boolean;
    position?: Position;
    alignPercent?: number;
    tailAlignPercent?: number;
};

export default function Tooltip({ className, children, tooltip, disabled, position = "bottom", alignPercent = 10, tailAlignPercent = 10 }: TooltipProps) {
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const [tooltipDimensions, setTooltipDimensions] = useState({ w: 0, h: 0 });

    const containerClass = useMemo(() => classNameConstructor(
        "tooltip-container",
        className
    ), [className]);
    const tailClass = useMemo(() => classNameConstructor(
        "tooltip-tail",
        `tooltip-position-${position}`,
    ), [position]);
    const tooltipClass = useMemo(() => classNameConstructor(
        "tooltip",
        `tooltip-position-${position}`,
    ), [position]);

    const tailStyle = useMemo(() => {
        const style: CSSProperties = {};
        if (position === "top" || position === "bottom") {
            const tooltipLeft = `(100% - ${tooltipDimensions.w}px) * ${alignPercent / 100} + 0.5rem`
            style.left = `calc(${tooltipLeft} + (${tooltipDimensions.w}px - 2rem) * ${tailAlignPercent / 100})`;
        } else {
            const tooltipTop = `(100% - ${tooltipDimensions.h}px) * ${alignPercent / 100} + 0.5rem`
            style.top = `calc(${tooltipTop} + (${tooltipDimensions.h}px - 2rem) * ${tailAlignPercent / 100})`;
        }
        return style;
    }, [position, tooltipDimensions, tailAlignPercent, alignPercent]);

    const tooltipStyle = useMemo(() => {
        const style: CSSProperties = {};
        if (position === "top" || position === "bottom") {
            style.left = `calc((100% - ${tooltipDimensions.w}px) * ${alignPercent / 100})`;
        } else {
            style.top = `calc((100% - ${tooltipDimensions.h}px) * ${alignPercent / 100})`;
        }
        return style;
    }, [position, tooltipDimensions, alignPercent]);
    useEffect(() => {
        const tooltip = tooltipRef.current;
        if (tooltip) {
            const observer = new ResizeObserver(() => {
                setTooltipDimensions({ w: tooltip.offsetWidth, h: tooltip.offsetHeight });
            });
            observer.observe(tooltip);
            return () => observer.disconnect();
        }
    }, []);

    return (
        <div className={containerClass}>
            <div className="tooltip-content-wrapper">
                {children}
            </div>
            {!disabled && <>
                <span className={tailClass} style={tailStyle} />
                <div className={tooltipClass} ref={tooltipRef} style={tooltipStyle}>
                    {tooltip}
                </div>
            </>}
        </div>
    )
}