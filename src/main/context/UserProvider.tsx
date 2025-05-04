import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { servicesConfig } from "../config/servicesConfig";
import { userPayloadSchema, UserSchema } from "../services/requests/users/login/responseValidator";

type UserValue = {
    jwt: string | null;
    user: UserSchema | null;
    login: (jwt: string, user: UserSchema) => void
    logout: () => void;
}

const UserContext = createContext<UserValue | null>(null);

type UserProviderProps = {
    children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
    const [jwt, setJwt] = useState(localStorage.getItem(servicesConfig.tokenKey));
    const [user, setUser] = useState<UserSchema | null>(null);
    useEffect(() => {
        if (jwt) try {
            setUser(userPayloadSchema.parse(jwt));
        } catch (err) {
            console.log("Invalid jwt token cached");
        }
    }, []);

    const login = useCallback((jwt: string, user: UserSchema) => {
        localStorage.setItem(servicesConfig.tokenKey, jwt);
        setJwt(jwt);
        setUser(user);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(servicesConfig.tokenKey);
        setJwt(null);
    }, []);

    return (
        <UserContext.Provider value={{ jwt, user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext<UserValue | null>(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
}