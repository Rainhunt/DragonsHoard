import { useCallback } from "react";
import { Request } from "../requests";
import { useUser } from "../../context/UserProvider";
import { getUserSchema } from "../responseValidators/users/getUser";

export default function useGetUser(id: string) {
    const { jwt } = useUser();
    return useCallback(async () => {
        try {
            if (jwt) {
                const request = new Request(`users/${id}`);
                request.Headers = { ["x-auth-token"]: jwt }
                const response = await request.get();
                const validateUser = getUserSchema.parse(response);
                return validateUser;
            } else {
                throw new Error("Unauthorized user");
            }
        } catch (err) {
            console.log(`Error getting user: ${err}`);
        }
    }, [jwt, id]);
}