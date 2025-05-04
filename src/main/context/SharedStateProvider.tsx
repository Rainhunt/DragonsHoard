import { createContext, ReactNode, SetStateAction, useCallback, useContext, useState } from "react"

type SharedStateValue<T extends Record<string, any> = Record<string, any>> = {
    sharedState: T;
    setState: <K extends keyof T>(key: K, set: SetStateAction<T[K]>) => void;
}

const SharedStateContext = createContext<SharedStateValue | null>(null);

type SharedStateProviderProps<T extends Record<string, any> = Record<string, any>> = {
    children: ReactNode;
    initialized: T;
}

export default function SharedStateProvider<T extends Record<string, any> = Record<string, any>>({ children, initialized }: SharedStateProviderProps<T>) {
    const [sharedState, setSharedState] = useState(initialized);

    const setState = useCallback(<K extends keyof T>(key: K, set: SetStateAction<T[K]>) => {
        setSharedState((prev) => ({ ...prev, [key]: typeof set === "function" ? (set as Function)(prev[key]) : set }))
    }, [setSharedState]);

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