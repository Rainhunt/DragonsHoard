import { useCallback } from "react";
import { Request } from "../requests";
import { SignupRequest } from "../requestValidators/signup";
import { useUser } from "../../context/UserProvider";

export default function useSignUp() {
    const { handleLogin } = useUser();
    return useCallback(async (userInfo: SignupRequest) => {
        try {
            const request = new Request("users/signup");
            request.Body = userInfo;
            await request.post();
            handleLogin({ email: userInfo.email, password: userInfo.password });
        } catch (err) {
            return String(err)
        }
    }, [handleLogin]);
}