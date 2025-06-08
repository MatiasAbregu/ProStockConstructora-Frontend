import React from "react";
import { Link } from "react-router-dom";
import '../styles/BotonAnadir.css';

export const BotonAnadir = ({ children }) => {
    return (
        <Link className="btnAdd"><span>{children}</span> <span className="material-symbols-outlined">add_circle</span></Link>
    );
}