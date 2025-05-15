import { useEffect } from "react";

type RedirectRouteProps = {
    to: string;
}

export default function RedirectRoute({ to }: RedirectRouteProps) {
    useEffect(() => window.location.replace(to), []);
    return null;
}