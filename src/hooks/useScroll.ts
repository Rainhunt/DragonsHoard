import { useCallback, useEffect, useRef, useState } from "react";
import throttle from "../utils/throttle";

export default function useScroll() {
    const [options, setOptions] = useState({
        throttle: 100
    });

    const handleScrollRef = useRef<(e: Event) => void>();
    const lastDownY = useRef(window.scrollY);
    const lastUpY = useRef(window.scrollY);
    const scrollDownHandlers = useRef<Record<string, (y: number) => void>>({});
    const scrollUpHandlers = useRef<Record<string, (y: number) => void>>({});
    const y = useRef(window.scrollY);

    const handleScroll = useCallback((e: Event) => {
        const window = e.currentTarget as Window;
        if (y.current > window.scrollY) {
            lastUpY.current = window.scrollY;
            for (const callback in scrollUpHandlers.current) {
                scrollUpHandlers.current[callback](window.scrollY);
            }
        } else if (y.current < window.scrollY) {
            lastDownY.current = window.scrollY;
            for (const callback in scrollDownHandlers.current) {
                scrollDownHandlers.current[callback](window.scrollY);
            }
        }
        y.current = window.scrollY;
    }, [scrollUpHandlers, scrollDownHandlers]);

    useEffect(() => {
        const handleScrollCallback = (e: Event) => handleScrollRef.current?.(e);
        window.addEventListener("scroll", handleScrollCallback);
        return () => {
            scrollDownHandlers.current = {};
            scrollUpHandlers.current = {};
            window.removeEventListener("scroll", handleScrollCallback);
        }
    }, []);
    useEffect(() => {
        handleScrollRef.current = throttle(options.throttle, handleScroll);
    }, [handleScroll, options.throttle]);

    return {
        addScrollHandler: (name: string, callback: (y: number) => void, options?: { direction?: "all" | "up" | "down", scrollDistance?: number }) => {
            if (options?.direction !== "up") {
                scrollDownHandlers.current[name] = (y: number) => {
                    if (!options?.scrollDistance || y - lastUpY.current > options.scrollDistance) callback(y);
                }
            }
            if (options?.direction !== "down") {
                scrollUpHandlers.current[name] = (y: number) => {
                    if (!options?.scrollDistance || lastDownY.current - y > options.scrollDistance) callback(y);
                }
            }
        },
        removeScrollHandler: (name: string) => {
            delete scrollDownHandlers.current[name];
            delete scrollUpHandlers.current[name];
        },
        options: {
            set throttle(time: number) {
                setOptions(prev => ({ ...prev, throttle: time }));
            }
        }
    }
}