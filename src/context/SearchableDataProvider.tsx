import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from "react";

type SearchableDataValue<T extends { _id: string } = { _id: string }> = {
    rootData: T[];
    filteredData: T[];
    sortData: (compareFn?: (a: T, b: T) => number) => void;
    setFilterParameters: Dispatch<SetStateAction<Record<string, (data: T[]) => T[]>>>;
    failedToFetch: boolean;
}

const SearchableDataContext = createContext<SearchableDataValue<any> | null>(null);

type SearchableDataProps<T> = {
    children: ReactNode;
    fetch: () => Promise<T[] | undefined>;
}

export default function SearchableDataProvider<T extends { _id: string } = { _id: string }>({ children, fetch }: SearchableDataProps<T>) {
    const [failedToFetch, setFailedToFetch] = useState(false);

    const [rootData, setRootData] = useState<T[]>([]);
    useEffect(() => {
        const getRootData = async () => {
            try {
                const response = await fetch();
                if (response) {
                    setRootData(response);
                } else {
                    setFailedToFetch(true);
                }
            } catch (err) {
                setFailedToFetch(true);
                console.log(`Error fetching data: ${err}`);
            }
        }
        getRootData();
    }, [fetch]);

    const sortData = useCallback((compareFn?: (a: T, b: T) => number) => {
        setRootData((data) => [...data].sort(compareFn));
    }, []);

    const [filterParameters, setFilterParameters] = useState<Record<string, (data: T[]) => T[]>>({});
    const [filteredData, setFilteredData] = useState<T[]>([]);
    useEffect(() => {
        let data = [...rootData];
        for (const key in filterParameters) {
            data = filterParameters[key](data);
        }
        setFilteredData(data);
    }, [rootData, filterParameters]);



    return (
        <SearchableDataContext.Provider value={{ rootData, filteredData, sortData, setFilterParameters, failedToFetch }}>
            {children}
        </SearchableDataContext.Provider>
    )
}

export function useSearchableData<T extends { _id: string } = { _id: string }>() {
    const context = useContext<SearchableDataValue<T> | null>(SearchableDataContext);
    if (!context) {
        throw new Error("useSearchableData muse be used within a SearchableDataProvider");
    }
    return context;
}