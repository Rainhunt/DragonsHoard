import React, { useCallback, useEffect, useState } from 'react'
import SearchBar from '../../../../components/SearchBar/SearchBar';
import { useSearchData } from '../../../../context/SearchableDataProvider';
import { GetUsersResponse } from '../../../../services/responseValidators/users/getUsers';

const LastNameFilter: React.FC = () => {
    const { setFilterParameters } = useSearchData();
    const [searchField, setSearchField] = useState<string>("");

    const searchFilter = useCallback((users: GetUsersResponse) => {
        return users.filter(user => user.lastName.includes(searchField));
    }, [searchField]);
    useEffect(() => {
        setFilterParameters(prev => ({ ...prev, lastName: searchFilter }));
    }, [searchFilter]);

    return (
        <div className="column">
            <SearchBar placeholder="Last Name..." ariaLabel="last name search bar" onSearch={setSearchField} />
        </div>
    )
}

export default LastNameFilter;