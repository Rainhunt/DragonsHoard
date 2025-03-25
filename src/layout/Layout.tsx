import './layout.scss';
import { createContext, CSSProperties, ReactNode, useContext, useMemo, useState } from "react"
import Header from "./Header/Header";

type LayoutValue = {
    theme: {
        get hideHeaderOnScroll(): boolean;
        set hideHeaderOnScroll(value);
    };
    page: {
        get margins(): CSSProperties["margin"];
        set margins(value);
        get offsetTop(): CSSProperties["marginTop"];
        set offsetTop(value);
        set backgroundImage(value: CSSProperties["backgroundImage"]);
        get alignPageContent(): CSSProperties["alignItems"];
        set alignPageContent(value);
        reset: () => void;
    }
}

const LayoutContext = createContext<LayoutValue | null>(null);

type LayoutProps = {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [themeValues, setThemeValues] = useState({
        hideHeaderOnScroll: true
    });

    const initialLayout = useMemo(() => ({
        margins: "10%",
        offsetTop: "50px",
        backgroundImage: undefined,
        alignPageContent: "left"
    }), []);
    const [pageValues, setPageValues] = useState<{
        margins: CSSProperties["margin"];
        offsetTop: CSSProperties["marginTop"];
        backgroundImage: CSSProperties["backgroundImage"];
        alignPageContent: CSSProperties["alignItems"];
    }>(initialLayout);
    const mainStyle = useMemo(() => {
        const style: CSSProperties = {};
        if (pageValues.margins) {
            style.paddingLeft = pageValues.margins;
            style.paddingRight = pageValues.margins;
        }
        if (pageValues.offsetTop) style.paddingTop = pageValues.offsetTop;
        if (pageValues.backgroundImage) style.backgroundImage = pageValues.backgroundImage;
        style.alignItems = pageValues.alignPageContent;
        return style;
    }, [pageValues]);

    const theme = useMemo(() => ({
        get hideHeaderOnScroll() { return themeValues.hideHeaderOnScroll },
        set hideHeaderOnScroll(value) { setThemeValues(prev => ({ ...prev, hideHeaderOnScroll: value })) }
    }), [themeValues]);
    const page = useMemo(() => ({
        get margins() { return pageValues.margins },
        set margins(value) { setPageValues(prev => ({ ...prev, margins: value })) },
        get offsetTop() { return pageValues.offsetTop },
        set offsetTop(value) { setPageValues(prev => ({ ...prev, offsetTop: value })) },
        set backgroundImage(value: CSSProperties["backgroundImage"]) { setPageValues(prev => ({ ...prev, backgroundImage: value })) },
        get alignPageContent() { return pageValues.alignPageContent },
        set alignPageContent(value) { setPageValues(prev => ({ ...prev, alignPageContent: value })) },
        reset: () => setPageValues(initialLayout)
    }), [themeValues]);

    return (
        <LayoutContext.Provider value={{ theme, page }}>
            <Header />
            <main style={mainStyle}>
                {children}
            </main>
        </LayoutContext.Provider>
    )
}

export function useLayout() {
    const context = useContext(LayoutContext);
    if (!context) throw new Error("useLayout muse be used within a Layout");
    return context;
}