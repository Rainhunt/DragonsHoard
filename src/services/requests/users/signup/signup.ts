import { useUser } from "../../../../context/UserProvider";
import { Request } from "../../Request";
import { userPayloadSchema } from "../login/responseValidator";
import { SignupSchema } from "./requestValidator";

export default async function useSignup(signupInfo: SignupSchema) {
    const { login } = useUser();
    try {
        const request = new Request("users/signup");
        request.Body = signupInfo;
        const response = await request.post();
        const user = userPayloadSchema.parse(response);
        const jwt = response as string;
        login(jwt, user);
    } catch (err) {
        console.log(`Failed to signup: ${err}`);
    }
}