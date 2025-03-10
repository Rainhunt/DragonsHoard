import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ROUTES from "./routerModel";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import SingupPage from "../pages/SignupPage/SignupPage";

export default function Router() {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.SIGNUP} element={<SingupPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}