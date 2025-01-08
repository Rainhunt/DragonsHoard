import './snack.scss';
import { CSSProperties, ReactNode, useEffect, useState } from "react";

interface SnackPropBasics {
    id: number;
    time: number;
    until?: boolean;
    style: CSSProperties;
    children: ReactNode;
}

interface SnackPropsPrivate {
    onTimer: (id: number) => void
    top: CSSProperties["top"];
    bottom: CSSProperties["bottom"];
    left: CSSProperties["left"];
    right: CSSProperties["right"];
}

interface SnackPropsLeft {
    left: CSSProperties["left"];
    right?: never;
}
interface SnackPropsRight {
    right: CSSProperties["right"];
    left?: never;
}

interface SnackPropsTop {
    top: CSSProperties["top"];
    bottom?: never;
}
interface SnackPropsBottom {
    bottom: CSSProperties["bottom"];
    top?: never;
}

export type SnackShape = (SnackPropsLeft | SnackPropsRight) & (SnackPropsTop | SnackPropsBottom) & SnackPropBasics;
type SnackProps = SnackPropBasics & SnackPropsPrivate

export default function Snack({ id, time, top, right, bottom, left, style, onTimer, children }: SnackProps) {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                onTimer(id);
            }, 500);
        }, time * 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [])
    return (
        <>
            <div className={`snack ${fadeOut ? "snack-fade-out" : ""}`} style={{ ...style, top: top, right: right, bottom: bottom, left: left }}>
                {children}
            </div>
        </>
    )
}
