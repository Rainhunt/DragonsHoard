import { useUser } from "../../../../../context/UserProvider";
import Button from "../../../../Button/Button";
import DropDownMenu from "../../../../DropDownMenu/DropDownMenu";

export default function ProfileIcon() {
    const { handleLogout } = useUser();
    return (
        <DropDownMenu label="Profile Icon" items={[<Button text="Log Out" onClick={() => handleLogout()} />]} right />
    )
}
