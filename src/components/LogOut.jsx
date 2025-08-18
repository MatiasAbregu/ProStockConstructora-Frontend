import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/LogOut.css';

export const LogOut = () => {
    return (
        <div className={"logOutButton"}>
            <NavLink to={"/log-out"}>Cerrar sesión &nbsp; <span className="material-symbols-outlined">logout</span></NavLink>
        </div>
    );
}