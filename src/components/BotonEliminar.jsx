import React from "react";
import '../styles/BotonEliminar.css';
export const BotonEliminar = ({ children, setOnClick }) => {
    return (
        <button className="btnEliminar" onClick={setOnClick}>
            <span>{children}</span> <span className="material-symbols-outlined">delete</span>
        </button>
    );
}