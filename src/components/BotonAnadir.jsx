import React from "react";
import '../styles/BotonAnadir.css';

export const BotonAnadir = ({ children, setOnClick }) => {
    return (
        <button className="btnAnadir" onClick={setOnClick}>
            <span>{children}</span> <span className="material-symbols-outlined">add_circle</span>
        </button>
    );
}