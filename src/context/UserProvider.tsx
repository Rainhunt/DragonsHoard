import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { LoginRequest } from "../services/requestValidators/login";
import { Request } from "../services/requests";
import { jwtDecode } from "jwt-decode";
import { UserPayload, userPayloadSchema } from "../services/responseValidators/users/userPayload";
import { servicesConfig } from "../config/servicesConfig";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routerModel";

interface UserContextType {
    jwt: string | undefined;
    user: UserPayload | undefined;
    handleLogin: (userInfo: LoginRequest) => Promise<void | string>;
    handleLogout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
    const navigate = useNavigate();

    const [jwt, setJwt] = useState<string>();
    useEffect(() => {
        const token = localStorage.getItem(servicesConfig.jwtKey);
        if (token) setJwt(token);
    }, []);
    const [user, setUser] = useState<UserPayload>();
    useEffect(() => {
        if (jwt) {
            localStorage.setItem(servicesConfig.jwtKey, jwt);
            const decoded = jwtDecode(jwt);
            const user = userPayloadSchema.parse(decoded);
            setUser(user);
        } else {
            localStorage.removeItem(servicesConfig.jwtKey);
            setUser(undefined);
        }
    }, [jwt]);

    const handleLogin = useCallback(async (userInfo: LoginRequest) => {
        try {
            const request = new Request("users/login");
            request.Body = userInfo;
            const response = await request.post() as string;
            setJwt(response);
            navigate(ROUTES.ROOT);
        } catch (err) {
            return String(err)
        }
    }, [setJwt]);

    const handleLogout = useCallback(() => {
        setJwt(undefined)
    }, []);

    return (
        <UserContext.Provider value={{ jwt, user, handleLogin, handleLogout }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(): UserContextType {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    } else {
        return context;
    }
}

export default UserProvider;