import React, { createContext, ReactNode, useContext, useState } from "react";

interface LayoutContextType {
    backgroundImage?: string;
    mainMarginPx?: number;
    setBackgroundImage?: (imageUrl: string) => void;
    setMainMarginPx?: (marginPx: number) => void;
}

const LayoutContext = createContext<LayoutContextType>({});

interface LayoutProviderProps {
    children: ReactNode;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
    const [backgroundImage, setBackgroundImage] = useState<string>();
    const [mainMarginPx, setMainMarginPx] = useState<number>();

    return (
        <LayoutContext.Provider value={{ backgroundImage, mainMarginPx, setBackgroundImage, setMainMarginPx }}>
            {children}
        </LayoutContext.Provider>
    )
}

export function useLayout(): LayoutContextType {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useLayout must be used within a LayoutProvider");
    } else {
        return context;
    }
}

export default LayoutProvider;