import './manage-users-page.scss'
import React, { useEffect } from 'react'
import { useLayout } from '../../context/LayoutProvider'
import Scroll from '../../components/Scroll/Scroll'
import LastNameFilter from './Filters/LastNameFilter/LastNameFilter'
import SearchableDataProvider from '../../context/SearchableDataProvider'
import UsersDisplay from './UsersDisplay/UserDisplay'
import useGetUsers from '../../services/userRequests/useGetUsers'
import FirstNameFilter from './Filters/FirstNameFilter/FirstNameFilter'
import EmailFilter from './Filters/EmailFilter/EmailFilter'

const ManageUsersPage: React.FC = () => {
    const { setPagePerms, setBackgroundImage, setMainMarginPx } = useLayout();
    const getUsers = useGetUsers();

    useEffect(() => {
        setPagePerms("admin");
        setBackgroundImage("/monster-codex-placeholder.jpg");
        setMainMarginPx(300);
    }, []);

    return (
        <SearchableDataProvider fetch={getUsers}>
            <h1 className="manage-users-header">Manage Users</h1>
            <Scroll className="filters" width={"100%"}>
                <FirstNameFilter />
                <LastNameFilter />
                <EmailFilter />
            </Scroll>
            <UsersDisplay />
        </SearchableDataProvider>
    )
}

export default ManageUsersPage;