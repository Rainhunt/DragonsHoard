import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import Header from "./Header/Header";

type LayoutValue = {
    theme: {
        get hideHeaderOnScroll(): boolean;
        set hideHeaderOnScroll(value: boolean);
    };
}

const LayoutContext = createContext<LayoutValue | null>(null);

type LayoutProps = {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [themeValues, setThemeValues] = useState({
        hideHeaderOnScroll: true
    });
    const theme = useMemo(() => ({
        get hideHeaderOnScroll() { return themeValues.hideHeaderOnScroll },
        set hideHeaderOnScroll(value: boolean) { setThemeValues(prev => ({ ...prev, hideHeaderOnScroll: value })) }
    }), [themeValues]);

    return (
        <LayoutContext.Provider value={{ theme }}>
            <Header />
            <div style={{ padding: "10%" }}>
                {children}
            </div>
        </LayoutContext.Provider>
    )
}

export function useLayout() {
    const context = useContext(LayoutContext);
    if (!context) throw new Error("useLayout muse be used within a Layout");
    return context;
}