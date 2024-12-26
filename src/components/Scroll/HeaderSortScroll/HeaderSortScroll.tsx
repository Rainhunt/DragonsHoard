import React, { ReactNode, useCallback, useState } from 'react'
import Scroll from '../Scroll';
import './header-sort-scroll.scss';
import SortByButton from '../../Button/SortBy/SortBy';

type HeaderSortScrollProps<T extends Record<string, string | number | React.ReactNode>> = {
    headers: { label: ReactNode, id: string, noSort?: boolean }[]
    data: T[]
    setData: React.Dispatch<React.SetStateAction<T[]>>
}

const HeaderSortScroll = <T extends Record<string, string | number | React.ReactNode>>({ headers, data, setData }: HeaderSortScrollProps<T>) => {
    const [sortOrder, setSortOrder] = useState<Record<string, "ascending" | "descending">>({})

    const sortByColumn = useCallback((id: string) => {
        const sortDir = sortOrder[id] === "ascending" ? "descending" : "ascending"
        setSortOrder({ [id]: sortDir });

        const newData = [...data].sort((a, b) => {
            const valueA = a[id as keyof T];
            const valueB = b[id as keyof T];

            if (valueA == null) return 1;
            if (valueB == null) return -1;

            if (sortDir === "ascending") {
                return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
            } else {
                return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
            }
        });

        setData(newData); // Update state with sorted data
    }, [data, setData]);
    return (
        <Scroll width={"100%"} backgroundColor={"#F1E5D1"}>
            <table width={"100%"}>
                <thead>
                    <tr>
                        {headers.map(header => (<th key={header.id}>{header.label} {header.noSort ? <></> : <SortByButton onClick={() => sortByColumn(header.id)} />}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr>
                            {headers.map((header) => (
                                <td key={header.id}>{row[header.id as keyof T]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Scroll>
    )
}

export default HeaderSortScroll;