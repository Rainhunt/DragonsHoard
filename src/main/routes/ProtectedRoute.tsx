import { ReactElement } from "react";
import useRoles, { PageAccessRoles } from "../hooks/useRoles";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    element: ReactElement;
    authorized: PageAccessRoles | PageAccessRoles[];
    redirect: ReactElement | string;
}

export default function ProtectedRoute({ element, authorized = "all", redirect }: ProtectedRouteProps) {
    return useRoles(authorized) ? element : typeof redirect === "string" ? <Navigate to={redirect} /> : redirect;
}