import React from "react"
import { Route, Routes } from "react-router-dom"
import { ROUTES } from "./routerModel"
import HomePage from "../pages/HomePage/HomePage"
import ErrorPage from "../pages/ErrorPage/ErrorPage"
import CodexPage from "../pages/CodexPage/CodexPage"
import MonsterStatblockPage from "../pages/MonsterStablockPage/MonsterStatblockPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import SignupPage from "../pages/SignupPage/SignupPage"
import CreateMonsterPage from "../pages/CreateMonsterPage/CreateMonsterPage"
import EditUserPage from "../pages/EditUser/EditUser"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import ManageUsersPage from "../pages/ManageUsersPage/ManageUsersPage"

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path={ROUTES.ROOT} element={<HomePage />} />
            <Route path={ROUTES.CODEX} element={<CodexPage />} />
            <Route path={ROUTES.MONSTER_STATBLOCK + "/:id"} element={<MonsterStatblockPage />} />
            <Route path={ROUTES.CREATE_MONSTER} element={<CreateMonsterPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.PROFILE + "/:id"} element={<ProfilePage />} />
            <Route path={ROUTES.EDIT_USER + "/:id"} element={<EditUserPage />} />
            <Route path={ROUTES.MANAGE_USERS} element={<ManageUsersPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

export default Router;