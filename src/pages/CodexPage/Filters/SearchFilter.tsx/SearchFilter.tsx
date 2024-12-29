import React, { useCallback, useEffect, useState } from 'react'
import { Monster } from '../../../../services/responseValidators/getMonster'
import SearchBar from '../../../../components/SearchBar/SearchBar';

type SearchFilterProps = {
    setFilterParameters: React.Dispatch<React.SetStateAction<Record<string, (monsters: Monster[]) => Monster[]>>>;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ setFilterParameters }) => {
    const [searchField, setSearchField] = useState<string>("");

    const searchFilter = useCallback((monsters: Monster[]) => {
        return monsters.filter(monster => monster.name.includes(searchField));
    }, [searchField]);
    useEffect(() => {
        setFilterParameters(prev => ({ ...prev, search: searchFilter }));
    }, [searchFilter]);

    return (
        <div className="row">
            <SearchBar onSearch={setSearchField} />
        </div>
    )
}

export default SearchFilter;