import { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { useSearchableData } from "../../../context/SearchableDataProvider";
import { ShortMonsterSchema } from "../../../services/requests/monsters/getMonsters/responseValidator";

export default function SearchFilter() {
    const { setFilterParameters } = useSearchableData<ShortMonsterSchema>();

    const [value, setValue] = useState<string>("");
    useEffect(() => {
        if (value) {
            setFilterParameters(prev => ({
                ...prev,
                search: (monsters) => monsters.filter(monster => monster.name.includes(value))
            }));
        } else {
            setFilterParameters(prev => {
                const filters = { ...prev };
                delete filters.search;
                return filters;
            });
        }
    }, [value]);

    return (
        <SearchBar placeholder="Search..." value={value} onChange={(value) => setValue(value)} />
    )
}