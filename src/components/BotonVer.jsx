import React from "react";
import '../styles/BotonVer.css';
export const BotonVer = ({ children, setOnClick }) => {
    return (
        <button className="btnVer" onClick={setOnClick}>
            <span>{children}</span> <span className="material-symbols-outlined">visibility</span>
        </button>
    );
};
