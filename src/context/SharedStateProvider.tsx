import { createContext, ReactNode, useCallback, useContext, useState } from "react"

type SharedStateValue<T extends Record<string, any> = Record<string, any>> = {
    sharedState: T;
    setState: (key: keyof T, value: any) => void;
}

const SharedStateContext = createContext<SharedStateValue | null>(null);

type SharedStateProviderProps = {
    children: ReactNode;
}

export default function SharedStateProvider({ children }: SharedStateProviderProps) {
    const [sharedState, setSharedState] = useState<Record<string, any>>({});

    const setState = useCallback(
        (key: string, value: any) => setSharedState((prev) => ({ ...prev, [key]: value })
        ), [setSharedState]);

    return (
        <SharedStateContext.Provider value={{ sharedState, setState }}>
            {children}
        </SharedStateContext.Provider>
    )
}

export function useSharedState<T extends Record<string, any> = Record<string, any>>() {
    const context = useContext(SharedStateContext);
    if (!context) {
        throw new Error("useSharedState muse be used within a SharedStatedProvider");
    }
    return context as SharedStateValue<T>;
}