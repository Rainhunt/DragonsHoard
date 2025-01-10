import './user-display.scss'
import HeaderSortScroll from '../../../components/Scroll/HeaderSortScroll/HeaderSortScroll'
import Button from '../../../components/Button/Button'
import { GetUserResponse } from '../../../services/responseValidators/users/getUser'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../routes/routerModel'

const UsersDisplay: React.FC = () => {
    const navigate = useNavigate();

    const columns = [
        { label: "First Name", id: "firstName" },
        { label: "Middle Name", id: "middleName" },
        { label: "Last Name", id: "lastName" },
        { label: "Email", id: "email" },
        { label: "Edit User", id: "edit", noSort: true },
        { label: "View Profile", id: "view", noSort: true }
    ]

    return (
        <HeaderSortScroll<GetUserResponse>
            className="display-scroll"
            headers={columns}
            errors={{ isEmpty: "No Users Match Your Search..." }}
            mutateDisplay={filteredUsers => filteredUsers.map(user => {
                user.edit = <Button className="edit-user-button" text="Edit" onClick={() => navigate(`${ROUTES.EDIT_USER}/${user._id}`)} />;
                user.view = <Button className="view-user-button" text="View Profile" onClick={() => navigate(`${ROUTES.PROFILE}/${user._id}`)} />;
                return user;
            })} />
    )
}

export default UsersDisplay;