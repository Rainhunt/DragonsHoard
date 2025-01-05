import React, { useCallback, useEffect, useState } from 'react'
import { Monster } from '../../../../services/responseValidators/getMonsters'
import SearchBar from '../../../../components/SearchBar/SearchBar';
import { useSearchData } from '../../../../context/SearchableDataProvider';

const SearchFilter: React.FC = () => {
    const { setFilterParameters } = useSearchData();
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