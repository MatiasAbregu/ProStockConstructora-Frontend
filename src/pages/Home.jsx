import { useEffect } from "react";
import "../styles/Home.css";
import Logo from "../img/LogoPSC.png";
import { Sidebar } from "../components/Sidebar";

export const Home = () => {
  useEffect(() => {
    document.title = "Inicio - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.classList.add("homepage");
  }, []);

  return (
    <>
      <Sidebar />
      <section className="Home">
        <button className="btn btn-primary">Hola</button>
        <button className="btn btn-primary">Hola</button>
        <button className="btn btn-primary">Hola</button>
        <button className="btn btn-primary">Seguimiento</button>
      </section>
    </>
  );
};
