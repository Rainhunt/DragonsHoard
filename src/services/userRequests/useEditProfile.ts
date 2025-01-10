import { useCallback } from "react";
import { Request } from "../requests";
import { EditUserRequest } from "../requestValidators/editUser";
import { useUser } from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routerModel";

export default function useEditProfile(id: string) {
    const { jwt } = useUser();
    const navigate = useNavigate();

    return useCallback(async (userInfo: EditUserRequest) => {
        try {
            if (jwt) {
                const request = new Request(`users/${id}`);
                request.Body = userInfo;
                request.Headers = { ["x-auth-token"]: jwt }
                await request.put();
                navigate(`${ROUTES.PROFILE}/${id}`);
            }
        } catch (err) {
            return `Error editing user: ${err}`;
        }
    }, [jwt]);
}