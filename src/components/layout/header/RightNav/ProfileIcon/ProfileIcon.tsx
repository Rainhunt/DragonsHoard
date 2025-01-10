import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../../context/UserProvider";
import Button from "../../../../Button/Button";
import DropDownMenu from "../../../../DropDownMenu/DropDownMenu";
import { ROUTES } from "../../../../../routes/routerModel";

export default function ProfileIcon() {
    const navigate = useNavigate();
    const { user, handleLogout } = useUser();

    return (
        <DropDownMenu label="Profile" items={[
            <Button key="view-profile" text="Profile" onClick={() => navigate(`${ROUTES.PROFILE}/${user?._id}`)} />,
            <Button key="log-out" text="Log Out" onClick={() => handleLogout()} />
        ]} right />
    )
}
