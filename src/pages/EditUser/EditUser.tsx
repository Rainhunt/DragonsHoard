import './edit-user.scss';
import { useEffect } from "react";
import { useLayout } from "../../context/LayoutProvider";
import EditUserForm from '../../forms/EditUserForm/EditUserForm';
import { useParams } from 'react-router-dom';

export default function EditUserPage() {
    const { setPagePerms, setWhitelist, setBackgroundImage } = useLayout();
    const { id } = useParams();
    useEffect(() => {
        id ? setWhitelist([id]) : setWhitelist([]);
        setPagePerms("whitelist");
        setBackgroundImage("/background-placeholder.png");
    }, []);

    return (
        <div className="edit-user-page">
            <div className="edit-user-container">
                <h1>Edit Profile</h1>
                <EditUserForm />
            </div>
        </div>
    )
}