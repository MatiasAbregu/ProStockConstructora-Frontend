import React from "react";
import { Navigate } from "react-router-dom";

export const LogOut = () => {
    return (
        <Navigate to={"/"} replace />
    )
}