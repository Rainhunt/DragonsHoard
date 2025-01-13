import { Breakpoints } from '../context/LayoutProvider';
import style from '../styles/index.module.scss';
import { useCallback, useEffect, useState } from "react";

export default function useBreakpoint() {
    const [activeBreakpoint, setActiveBreakpoint] = useState<keyof Breakpoints>("desktop");
    const [width, setWidth] = useState<number>(window.innerWidth);

    const handleResize = useCallback(() => {
        setWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (width > parseInt(style.tablet)) {
            setActiveBreakpoint("desktop");
        } else if (width > parseInt(style.phone)) {
            setActiveBreakpoint("tablet");
        } else {
            setActiveBreakpoint("phone");
        }
    }, [width]);

    return activeBreakpoint;
}