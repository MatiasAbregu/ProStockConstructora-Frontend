import React from "react";
import '../styles/BotonBuscar.css';

export const BotonBuscar = ({children}) => {
    return (
        <button className="btnBuscar"><span>{children}</span> <span className="material-symbols-outlined">search</span></button>
    );
}