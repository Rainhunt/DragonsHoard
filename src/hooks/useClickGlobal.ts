import { RefObject, useCallback, useEffect } from "react";

export default function useClickGlobal(onClick: (e: MouseEvent) => void, ref?: RefObject<HTMLElement>) {
    const handleUnclick = useCallback((e: MouseEvent) => {
        if (ref === undefined || ref.current && e.target instanceof Node && !ref.current.contains(e.target)) onClick(e);
    }, [ref, onClick]);

    useEffect(() => {
        document.addEventListener("mousedown", handleUnclick);
        return () => document.removeEventListener("mousedown", handleUnclick);
    }, [handleUnclick]);
}


