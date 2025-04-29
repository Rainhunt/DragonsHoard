import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ROUTES from "./routerModel";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import MonstersPage from "../pages/MonstersPage/MonstersPage";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage/LoginPage";
import MonsterStatblockPage from "../pages/MonsterStatblockPage/MonsterStatblockPage";
import GameTablePage from "../pages/GameTablePage/GameTablePage";

export default function Router() {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.SIGNUP} element={<ProtectedRoute element={<SignupPage />} authorized={["notLogged", "admin"]} redirect={ROUTES.HOME} />} />
            <Route path={ROUTES.LOGIN} element={<ProtectedRoute element={<LoginPage />} authorized={["notLogged", "admin"]} redirect={ROUTES.HOME} />} />
            <Route path={`${ROUTES.MONSTER}/:id`} element={<MonsterStatblockPage />} />
            <Route path={ROUTES.MONSTERS} element={<MonstersPage />} />
            <Route path={ROUTES.GAME_TABLE} element={<ProtectedRoute element={<GameTablePage />} authorized={["user", "admin"]} redirect={ROUTES.HOME} />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}