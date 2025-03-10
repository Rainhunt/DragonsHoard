import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from '../styles/index.module.scss';
import { Breakpoints } from '../types/styleTypes';

export default function useBreakpoints() {
    const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoints>("desktop");
    const breakpoints = useMemo(() => ({
        desktop: parseInt(styles.desktop),
        laptop: parseInt(styles.laptop),
        tablet: parseInt(styles.tablet),
        mobile: parseInt(styles.mobile),
    }), []);

    const getCurrentBreakpoint = useCallback((width: number) => {
        if (width >= breakpoints.desktop) {
            return "wideScreen";
        } else if (width >= breakpoints.laptop) {
            return "desktop";
        } else if (width >= breakpoints.tablet) {
            return "laptop";
        } else if (width >= breakpoints.mobile) {
            return "tablet";
        } else {
            return "mobile";
        }
    }, [breakpoints]);

    useEffect(() => {
        const handleResize = () => {
            setCurrentBreakpoint(getCurrentBreakpoint(window.innerWidth));
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [getCurrentBreakpoint]);

    return currentBreakpoint;
}