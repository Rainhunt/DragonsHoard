import { useCallback } from 'react';

export default function useRelativeComplement() {
    const relativeComplementArray = useCallback((array: string[], complement: string[], id: string) => {
        const index = array.indexOf(id);
        if (index !== -1) {
            array.splice(index, 1);

            for (let i = 0; i < complement.length; i++) {
                if (complement[i] > id) {
                    complement.splice(i, 0, id);
                    return;
                }
            }
            complement.push(id);
        }
    }, []);

    const handleRelativeComplement = useCallback((
        id: string,
        array: string[],
        setArray: React.Dispatch<React.SetStateAction<string[]>>,
        targetArray: string[],
        setTargetArray: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        const newArray = [...array];
        const newTargetArray = [...targetArray];
        relativeComplementArray(newArray, newTargetArray, id);
        setArray(newArray);
        setTargetArray(newTargetArray);
    }, [relativeComplementArray]);

    return { handleRelativeComplement };
}