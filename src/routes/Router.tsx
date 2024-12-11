import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routerModel";
import Button from "../components/Button/Button";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path={ROUTES.ROOT} element={<Button text="home page" />} />
            <Route path="*" element={<Button text="error" />} />
        </Routes>
    )
}

export default Router;