import React, { useCallback, useEffect, useState } from 'react'
import SearchBar from '../../../../components/SearchBar/SearchBar';
import { useSearchData } from '../../../../context/SearchableDataProvider';
import { GetUsersResponse } from '../../../../services/responseValidators/users/getUsers';

const EmailFilter: React.FC = () => {
    const { setFilterParameters } = useSearchData();
    const [searchField, setSearchField] = useState<string>("");

    const searchFilter = useCallback((users: GetUsersResponse) => {
        return users.filter(user => user.email.includes(searchField));
    }, [searchField]);
    useEffect(() => {
        setFilterParameters(prev => ({ ...prev, email: searchFilter }));
    }, [searchFilter]);

    return (
        <div className="column">
            <SearchBar placeholder="Email..." ariaLabel="email search bar" onSearch={setSearchField} />
        </div>
    )
}

export default EmailFilter;