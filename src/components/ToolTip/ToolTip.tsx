import './tooltip.scss'
import { ReactNode } from 'react'

interface ToolTipBasics {
    tooltip: ReactNode;
    children: ReactNode;
    className?: string;
}

interface ToolTipsLeft extends ToolTipBasics {
    left: boolean;
    right?: never;
}

interface ToolTipsRight extends ToolTipBasics {
    right: boolean;
    left?: never;
}

type ToolTipProps = ToolTipsLeft | ToolTipsRight;

export default function ToolTip({ children, tooltip, right, className }: ToolTipProps) {
    return (
        <div className={`tooltip-container ${className}`}>
            <div className="tooltip-content-wrapper">
                {children}
            </div>
            <div className={`tooltip ${right ? "tooltip-right" : "tooltip-left"}`} style={right ? { right: "10%" } : { left: "10%" }}>
                {tooltip}
            </div>
        </div>
    )
}
