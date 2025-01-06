import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface DataContextType<T extends Record<string, any>> {
    data: T | undefined;
}

const DataContext = createContext<DataContextType<any> | undefined>(undefined);

interface DataProviderProps<T> {
    fetch: () => Promise<T | undefined>;
    children: ReactNode;
}

const DataProvider = <T extends Record<string, any>>({ children, fetch }: DataProviderProps<T>) => {
    const [data, setData] = useState<T>();
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch();
                if (response) setData(response);
            } catch (err) {
                console.log(`Error fetching monsters: ${err}`);
            }
        }
        getData();
    }, []);

    return (
        <DataContext.Provider value={{ data }}>
            {children}
        </DataContext.Provider>
    )
}

export function useData<T extends Record<string, any>>(): DataContextType<T> {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    } else {
        return context;
    }
}

export default DataProvider;