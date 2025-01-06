import React from "react"
import { Route, Routes } from "react-router-dom"
import { ROUTES } from "./routerModel"
import HomePage from "../pages/HomePage/HomePage"
import ErrorPage from "../pages/ErrorPage/ErrorPage"
import CodexPage from "../pages/CodexPage/CodexPage"
import MonsterStatblockPage from "../pages/MonsterStablockPage/MonsterStatblockPage"
import LoginPage from "../pages/LoginPage/LoginPage"

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path={ROUTES.ROOT} element={<HomePage />} />
            <Route path={ROUTES.CODEX} element={<CodexPage />} />
            <Route path={ROUTES.MONSTER_STATBLOCK + "/:id"} element={<MonsterStatblockPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

export default Router;