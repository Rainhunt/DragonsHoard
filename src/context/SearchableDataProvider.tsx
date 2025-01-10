import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

interface SearchableDataContextType<T extends Record<string, string | number | React.ReactNode>> {
    rootData: T[];
    sortedData: T[];
    filterParameters: Record<string, (data: T[]) => T[]>;
    filteredData: T[];
    setSortedData: React.Dispatch<React.SetStateAction<T[]>>;
    setFilterParameters: React.Dispatch<React.SetStateAction<Record<string, (data: T[]) => T[]>>>;
}

const SearchableDataContext = createContext<SearchableDataContextType<any> | undefined>(undefined);

interface SearchableDataProviderProps<T> {
    fetch: () => Promise<T[] | undefined>;
    children: ReactNode;
}

const SearchableDataProvider = <T extends Record<string, any>>({ children, fetch }: SearchableDataProviderProps<T>) => {
    const [rootData, setRootData] = useState<T[]>([]);
    useEffect(() => {
        const getRootData = async () => {
            try {
                const response = await fetch();
                if (response) setRootData(response);
            } catch (err) {
                console.log(`Error fetching data: ${err}`);
            }
        }
        getRootData();
    }, [fetch]);
    const [sortedData, setSortedData] = useState<T[]>([]);
    useEffect(() => {
        setSortedData(rootData);
    }, [rootData]);
    const [filterParameters, setFilterParameters] = useState<Record<string, (monsters: T[]) => T[]>>({});
    const [filteredData, setFilteredData] = useState<T[]>([]);
    const useFilters = useCallback(() => {
        let dataToBeFiltered = sortedData;
        for (const key in filterParameters) {
            dataToBeFiltered = filterParameters[key](dataToBeFiltered);
        }
        setFilteredData(dataToBeFiltered);
    }, [sortedData, filterParameters]);
    useEffect(() => {
        useFilters();
    }, [sortedData, filterParameters]);


    return (
        <SearchableDataContext.Provider value={{ rootData, sortedData, filterParameters, filteredData, setSortedData, setFilterParameters }}>
            {children}
        </SearchableDataContext.Provider>
    )
}

export function useSearchData(): SearchableDataContextType<any> {
    const context = useContext(SearchableDataContext);
    if (!context) {
        throw new Error("useSearchData must be used within a SearchableDataProvider");
    } else {
        return context;
    }
}

export default SearchableDataProvider;