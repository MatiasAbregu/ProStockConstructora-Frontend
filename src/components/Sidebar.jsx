import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";


export const Sidebar = () => {
const navLinkClass = ({ isActive }) => isActive ? "sidebar-link active" : "side-bar-link";

  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/home" className={navLinkClass}>
            Inicio &nbsp;
            <span className="material-symbols-outlined">home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/materials" className={navLinkClass}>
            Materiales &nbsp;
            <span className="material-symbols-outlined">construction</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/machines" className={navLinkClass}>
            Maquinarias &nbsp;
            <span className="material-symbols-outlined">forklift</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/tracking" className={navLinkClass}>
            Pedidos &nbsp;
            <span className="material-symbols-outlined">inventory_2</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/construction-work" className={navLinkClass}>
            Obras &nbsp;
            <span className="material-symbols-outlined">auto_towing</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/enterprises" className={navLinkClass}>
            Empresas &nbsp;
            <span className="material-symbols-outlined">business</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/stadistics" className={navLinkClass}>
            Estadísticas &nbsp;
            <span className="material-symbols-outlined">analytics</span>
          </NavLink>
        </li>
        <li>
        <NavLink to="/users" className={navLinkClass}>
            Usuarios &nbsp;
            <span className="material-symbols-outlined">groups</span>
          </NavLink>
        </li>

      </ul>
    </div>
  );
};
