import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import Button from "../../../components/Button/Button";
import ScrollingContainer from "../../../components/ScrollingContainer/ScrollingContainer";
import { useSearchableData } from "../../../context/SearchableDataProvider";
import SearchableDropDown from "../../../components/DropDown/SearchableDropDown/SearchableDropDown";

type DropDownFilterProps<T extends { _id: string } = { _id: string }> = {
    id: { [K in keyof T]: T[K] extends string ? K : never }[keyof T];
    label: string;
    onEmpty?: ReactNode;
}

export default function DropDownFilter<T extends { _id: string } = { _id: string }>({ id, label, onEmpty = "Nothing Here" }: DropDownFilterProps<T>) {
    const { rootData, setFilterParameters } = useSearchableData<T>();
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const options = useMemo(() => [...new Set(rootData.map((document) => document[id]))], [rootData]);

    useEffect(() => {
        if (selectedOptions.length > 0) {
            setFilterParameters(prev => ({
                ...prev,
                [id]: (documents: T[]) => documents.filter(document => selectedOptions.includes(document[id] as string))
            }));
        } else {
            setFilterParameters(prev => {
                const filters = { ...prev };
                delete filters[id as string];
                return filters;
            });
        }
    }, [selectedOptions]);

    const removeOption = useCallback((option: string) => setSelectedOptions(prev => prev.filter(selected => selected !== option)), []);

    return (
        <div className="column-container">
            <SearchableDropDown id={`${id as string}-filter`} label={{ text: label }} children={options as string[]} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
            <ScrollingContainer items={selectedOptions.map(id => ({
                key: id,
                item: <Button text={`${id} \u00D7`} onClick={() => removeOption(id)} />
            }))} onEmpty={onEmpty} />
        </div>
    )
}