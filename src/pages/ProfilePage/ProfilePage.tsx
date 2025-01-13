import './profile-page.scss';
import { useNavigate, useParams } from "react-router-dom";
import { useLayout } from "../../context/LayoutProvider";
import { useEffect } from "react";
import useGetUser from "../../services/userRequests/useGetUser";
import DataProvider from "../../context/DataProvider";
import NameContainer from "./NameContainer/NameContainer";
import EmailContainer from './EmailContainer/EmailContainer';
import Button from '../../components/Button/Button';
import { ROUTES } from '../../routes/routerModel';

export default function ProfilePage() {
    const { setPagePerms, setWhitelist, setBackgroundImage, setMainMarginPx } = useLayout();
    const { id } = useParams();
    const getUser = useGetUser(id ? id : "");
    const navigate = useNavigate();


    useEffect(() => {
        setPagePerms("whitelist");
        id ? setWhitelist([id]) : setWhitelist([]);
        setBackgroundImage("/background-placeholder.png");
        setMainMarginPx({
            desktop: "15%",
            tablet: "10%",
            phone: "7%"
        });
    }, []);

    return (
        <DataProvider fetch={getUser}>
            <div className="profile-page">
                <div className="profile-container">
                    <NameContainer />
                    <EmailContainer />
                    <Button className="edit-profile-button" text="Customize Profile" onClick={() => navigate(`${ROUTES.EDIT_USER}/${id}`)} />
                </div>
            </div>
        </DataProvider>
    )
}