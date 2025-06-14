import { useEffect } from "react";
import "../styles/Login.css";
import Logo from "../img/LogoPSC.png";

export const Login = () => {
  useEffect(() => {
    document.title = "Inicio Sesión - ProStockConstructora";
  }, []);

  return (
    <>
      <section className="login">
        <article className="">
          <img src={Logo} alt="Alternate Text" />
          <h1>Bienvenido a Pro Stock Construcción</h1>
        </article>
        <form action="/home" method="get">
          <h2>Iniciar Sesión</h2>
          <input type="text" placeholder="Ingrese nombre de usuario" />
          <input type="password" placeholder="Ingrese contraseña" />
          <div className="checkboxDiv">
            <input type="checkbox" />
            <label>Mantener sesión iniciada</label>
          </div>
          <button type="submit">Ingresar</button>
        </form>
      </section>
    </>
  );
};
