import { useCallback } from "react";
import { Request } from "../requests";
import { useUser } from "../../context/UserProvider";
import { getUsersSchema } from "../responseValidators/users/getUsers";

export default function useGetUsers() {
    const { jwt } = useUser();

    return useCallback(async () => {
        console.log(jwt);

        try {
            if (jwt) {
                const request = new Request("users");
                request.Headers = { ["x-auth-token"]: jwt };
                const response = await request.get();
                return getUsersSchema.parse(response);
            } else {
                throw new Error("Unauthorized user");
            }
        } catch (err) {
            console.log(`Error getting users: ${err}`);
        }
    }, [jwt]);
}