import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routerModel";
import HomePage from "../pages/HomePage/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path={ROUTES.ROOT} element={<HomePage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

export default Router;