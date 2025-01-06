import './header-sort-scroll.scss'
import React, { ReactNode, useCallback, useState } from 'react'
import Scroll from '../Scroll'
import SortByButton from '../../Button/SortBy/SortBy'
import { useSearchData } from '../../../context/SearchableDataProvider'

type HeaderSortScrollProps<T extends Record<string, string | number | React.ReactNode>> = {
    headers: { label: ReactNode, id: string, noSort?: boolean }[];
    mutateDisplay?: (filteredData: T[]) => T[];
    errors?: { failToFetch?: string, isEmpty?: string };
    className?: string;
}

const HeaderSortScroll = <T extends Record<string, string | number | React.ReactNode>>({ headers, mutateDisplay, errors, className }: HeaderSortScrollProps<T>) => {
    const { rootData, setSortedData, filteredData } = useSearchData()
    const [sortOrder, setSortOrder] = useState<Record<string, "ascending" | "descending">>({})

    const sortByColumn = useCallback((id: string) => {
        const sortDir = sortOrder[id] === "ascending" ? "descending" : "ascending"
        setSortOrder({ [id]: sortDir });

        const sortedData = [...rootData].sort((a, b) => {
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

        setSortedData(sortedData);
    }, [rootData, setSortedData]);

    return (
        <Scroll width={"100%"} backgroundColor={"#F1E5D1"} className={className}>
            <table width={"100%"}>
                <thead>
                    <tr>
                        {headers.map(header => (<th key={header.id}>{header.label} {header.noSort ? <></> : <SortByButton onClick={() => sortByColumn(header.id)} />}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {errors?.isEmpty && filteredData.length === 0 ? <tr><td colSpan={headers.length}>{errors.isEmpty}</td></tr> : (mutateDisplay ? mutateDisplay(filteredData) : filteredData).map((row) => (
                        <tr key={row["_id"]}>
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