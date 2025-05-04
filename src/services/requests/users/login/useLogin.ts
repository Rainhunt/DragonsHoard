import { useCallback } from "react";
import { useUser } from "../../../../context/UserProvider";
import { Request } from "../../Request";
import { LoginSchema } from "./requestValidator";
import { userPayloadSchema } from "./responseValidator";
import retryWithBackoff from "../../../../utils/retryWithBackoff";

export default function useLogin() {
    const { login } = useUser();
    return useCallback(async (loginInfo: LoginSchema) => {
        try {
            const request = new Request("users/login");
            request.Body = loginInfo;
            const response = await retryWithBackoff(request.post);
            const user = userPayloadSchema.parse(response);
            const jwt = response as string;
            login(jwt, user);
        } catch (err) {
            console.log(`Failed to log in: ${err}`);
        }
    }, []);
}