import { useUser } from "../context/UserProvider";

export type PageAccessRoles = "all" | "notLogged" | "user" | "admin";

export default function useRoles(authorized: PageAccessRoles | PageAccessRoles[]) {
    const { jwt, user } = useUser();
    const roles = Array.isArray(authorized) ? authorized : [authorized];
    return roles.some(role => {
        switch (role) {
            case "all":
                return true;
            case "notLogged":
                return jwt === null;
            case "user":
                return jwt !== null;
            case "admin":
                return !!user?.isAdmin;
        }
    });
}