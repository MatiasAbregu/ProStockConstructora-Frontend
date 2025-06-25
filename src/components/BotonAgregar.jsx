import React from "react";
import '../styles/BotonAgregar.css';
export const BotonAgregar = ({ children, setOnClick }) => {
    return (
        <button className="btnAgregar" onClick={setOnClick}>
            <span>{children}</span> <span className="material-symbols-outlined">add_circle</span>
        </button>
    );
}