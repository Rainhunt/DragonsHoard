import React, { useCallback, useEffect, useState } from 'react'
import SearchBar from '../../../../components/SearchBar/SearchBar';
import { useSearchData } from '../../../../context/SearchableDataProvider';
import { GetUsersResponse } from '../../../../services/responseValidators/users/getUsers';

const FirstNameFilter: React.FC = () => {
    const { setFilterParameters } = useSearchData();
    const [searchField, setSearchField] = useState<string>("");

    const searchFilter = useCallback((users: GetUsersResponse) => {
        return users.filter(user => user.firstName.includes(searchField));
    }, [searchField]);
    useEffect(() => {
        setFilterParameters(prev => ({ ...prev, firstName: searchFilter }));
    }, [searchFilter]);

    return (
        <div className="column">
            <SearchBar placeholder="First Name..." ariaLabel="first name search bar" onSearch={setSearchField} />
        </div>
    )
}

export default FirstNameFilter;