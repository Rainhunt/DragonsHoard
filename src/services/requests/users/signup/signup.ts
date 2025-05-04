import { useCallback } from "react";
import { useUser } from "../../../../context/UserProvider";
import { Request } from "../../Request";
import { userPayloadSchema } from "../login/responseValidator";
import { SignupSchema } from "./requestValidator";
import retryWithBackoff from "../../../../utils/retryWithBackoff";

export default function useSignup() {
    const { login } = useUser();
    return useCallback(async (signupInfo: SignupSchema) => {
        try {
            const request = new Request("users/signup");
            request.Body = signupInfo;
            const response = await retryWithBackoff(request.post);
            const user = userPayloadSchema.parse(response);
            const jwt = response as string;
            login(jwt, user);
        } catch (err) {
            console.log(`Failed to signup: ${err}`);
        }
    }, [])
}