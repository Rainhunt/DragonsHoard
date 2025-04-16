import { useUser } from "../../../../context/UserProvider";
import { Request } from "../../Request";
import { LoginSchema } from "./requestValidator";
import { userPayloadSchema } from "./responseValidator";

export default async function useLogin(loginInfo: LoginSchema) {
    const { login } = useUser();
    try {
        const request = new Request("users/login");
        request.Body = loginInfo;
        const response = await request.post();
        const user = userPayloadSchema.parse(response);
        const jwt = response as string;
        login(jwt, user);
    } catch (err) {
        console.log(`Failed to log in: ${err}`);
    }
}