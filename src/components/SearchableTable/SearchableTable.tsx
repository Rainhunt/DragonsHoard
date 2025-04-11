import './searchable-table.scss';
import { ReactNode, useCallback, useMemo, useState } from "react";
import { useSearchableData } from "../../context/SearchableDataProvider";
import Button from "../Button/Button";
import classNameConstructor from "../../utils/classNameConstructor";

export type SearchableTableColumn<T> = {
    label: ReactNode;
    id: string;
    cellValue: (data: T) => ReactNode;
    sortFunc?: ((a: T, b: T) => number);
}

type SearchableTableProps<T> = {
    className?: string;
    columns: SearchableTableColumn<T>[];
    errorValues?: {
        failedToFetch?: ReactNode;
        tableIsEmpty?: ReactNode;
    }
}

export default function SearchableTable<T extends { _id: string }>({ className, columns, errorValues }: SearchableTableProps<T>) {
    const { filteredData, sortData, failedToFetch } = useSearchableData<T>();
    const [sortedColumn, setSortedColumn] = useState<string>();
    const [sortOrder, setSortOrder] = useState<-1 | 1>(-1);

    const containerClass = useMemo(() => classNameConstructor(
        "searchable-table",
        className
    ), [className]);

    const handleSort = useCallback((columnId: string, compareFn?: ((a: T, b: T) => number)) => {
        if (compareFn === undefined) return;
        if (sortedColumn === columnId) {
            sortData((a, b) => sortOrder * compareFn(a, b));
            setSortOrder(prev => prev === 1 ? -1 : 1);
        } else {
            sortData(compareFn);
            setSortedColumn(columnId);
            setSortOrder(-1);
        }
    }, [sortedColumn, sortOrder, sortData]);

    return (
        <table className={containerClass}>
            <thead>
                <tr>
                    {columns.map(column => (<th key={column.id}>
                        <div className="table-header-wrapper">
                            {column.label}
                            {column.sortFunc && <Button className="sort-by-button" onClick={() => handleSort(column.id, column.sortFunc)}>
                                <div className={classNameConstructor(column.id === sortedColumn && sortOrder === 1 && "sort-by-arrow-dim") || undefined}>{"\u25B2"}</div>
                                <div className={classNameConstructor(column.id === sortedColumn && sortOrder === -1 && "sort-by-arrow-dim") || undefined}>{"\u25BC"}</div>
                            </Button>}
                        </div>
                    </th>))}
                </tr>
            </thead>
            <tbody>
                {failedToFetch ? <tr><td colSpan={columns.length}>{errorValues?.failedToFetch ?? "Failed to Load Data"}</td></tr> :
                    filteredData.length === 0 ? <tr><td colSpan={columns.length}>{errorValues?.tableIsEmpty ?? "No Results Match Your Search"}</td></tr> :
                        filteredData.map(row => (<tr key={row._id}>
                            {columns.map(cell => (<td key={cell.id}>
                                {cell.cellValue(row)}
                            </td>))}
                        </tr>))}
            </tbody>
        </table>
    )
}