import React, { createContext, ReactNode, useCallback, useContext, useState } from "react";
import Snack, { SnackShape } from "../components/Snack/Snack";
import { PagePerms } from "../types";

interface LayoutContextType {
    pagePerms: PagePerms;
    whitelist: string[];
    backgroundImage: string;
    mainMarginPx: number;
    setPagePerms: (perms: PagePerms) => void;
    setWhitelist: (userIds: string[]) => void;
    setBackgroundImage: (imageUrl: string) => void;
    setMainMarginPx: (marginPx: number) => void;
    createSnack: (snack: SnackShape) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProviderProps {
    children: ReactNode;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
    const [pagePerms, setPagePerms] = useState<PagePerms>("all");
    const [whitelist, setWhitelist] = useState<string[]>([]);
    const [backgroundImage, setBackgroundImage] = useState<string>("/background-placeholder.png");
    const [mainMarginPx, setMainMarginPx] = useState<number>(300);
    const [snacks, setSnacks] = useState<SnackShape[]>([]);

    const onSnackRemove = useCallback((id: number) => {
        setSnacks((prev) => prev.filter(snack => snack.id !== id));
    }, [setSnacks]);

    const createSnack = useCallback((snack: SnackShape) => {
        setSnacks((prev) => [...prev, snack]);
    }, [setSnacks]);

    return (
        <LayoutContext.Provider value={{ pagePerms, whitelist, backgroundImage, mainMarginPx, setPagePerms, setWhitelist, setBackgroundImage, setMainMarginPx, createSnack }}>
            {children}
            {snacks.map((snack) =>
                <Snack
                    key={snack.id}
                    id={snack.id}
                    time={snack.time}
                    top={snack.top}
                    bottom={snack.bottom}
                    right={snack.right}
                    left={snack.left}
                    style={snack.style}
                    onTimer={onSnackRemove}
                >
                    {snack.children}
                </Snack>
            )}
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