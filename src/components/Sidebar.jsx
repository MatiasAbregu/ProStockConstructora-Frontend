import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../styles/Sidebar.css";
import { tr } from "framer-motion/client";

export const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(true);
  const [sidebarEnable, setSidebarEnable] = useState(false);

  const navLinkClass = ({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link";

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setSidebarEnable(true);
        setIsOpen(false);
      }
      else {
        setSidebarEnable(false);
        setIsOpen(true);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <>
      {/*Boton HAMBURGUESA*/}
      {
        sidebarEnable ?
          <button className="hamburger-button" onClick={toggleSidebar} aria-label="Toggle Sidebar">
            <span className="material-symbols-outlined">menu</span>
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
          </button> : undefined
      }

      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <ul>
          <li>
            <NavLink to="/home" className={navLinkClass} onClick={closeSidebar}>
              Inicio &nbsp;
              <span className="material-symbols-outlined">home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/materials" className={navLinkClass} onClick={closeSidebar}>
              Recursos &nbsp;
              <span className="material-symbols-outlined">construction</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/tracking" className={navLinkClass} onClick={closeSidebar}>
              Pedidos &nbsp;
              <span className="material-symbols-outlined">inventory_2</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/construction-work" className={navLinkClass} onClick={closeSidebar}>
              Obras &nbsp;
              <span className="material-symbols-outlined">auto_towing</span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/enterprises" className={navLinkClass} onClick={closeSidebar}>
              Empresas &nbsp;
              <span className="material-symbols-outlined">business</span>
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/stadistics" className={navLinkClass} onClick={closeSidebar}>
              Estadísticas &nbsp;
              <span className="material-symbols-outlined">analytics</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className={navLinkClass} onClick={closeSidebar}>
              Usuarios &nbsp;
              <span className="material-symbols-outlined">groups</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
