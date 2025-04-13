import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ROUTES from "./routerModel";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import MonstersPage from "../pages/MonstersPage/MonstersPage";
import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.SIGNUP} element={<ProtectedRoute element={<SignupPage />} authorized={["notLogged", "admin"]} redirect={ROUTES.HOME} />} />
            <Route path={ROUTES.MONSTERS} element={<MonstersPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}