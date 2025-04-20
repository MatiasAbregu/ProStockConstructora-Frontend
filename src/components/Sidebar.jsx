import React from "react";
import "../styles/Sidebar.css";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="/">
            Inicio &nbsp;
            <span className="material-symbols-outlined">home</span>
          </a>
        </li>
        <li>
          <a href="/materials">
            Materiales &nbsp;
            <span className="material-symbols-outlined">construction</span>
          </a>
        </li>
        <li>
          <a href="/machines">
            Maquinarias &nbsp;
            <span class="material-symbols-outlined">forklift</span>
          </a>
        </li>
        <li>
          <a href="/tracking">
            Seguimiento &nbsp;
            <span class="material-symbols-outlined">construction</span>
          </a>
        </li>
        <li>
          <a href="/deposits">
            Depósitos &nbsp;
            <span className="material-symbols-outlined">warehouse</span>
          </a>
        </li>
        <li>
          <a href="/enterprises">
            Empresas &nbsp;
            <span className="material-symbols-outlined">business</span>
          </a>
        </li>
        <li>
          <a href="/analytics">
            Estadísticas &nbsp;
            <span className="material-symbols-outlined">analytics</span>
          </a>
        </li>
        <li>
          <a href="/log-out">
            Cerrar sesión &nbsp;
            <span className="material-symbols-outlined">logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};
