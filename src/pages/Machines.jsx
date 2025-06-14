import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import "../styles/Machines.css";
import "../styles/Table.css";

export const Machines = () => {
  useEffect(() => {
    document.title = "Maquinaria - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="Machines">
        <Table
          columnas={["Código", "Nombre", "Descripción", "Disponibilidad"]}
          columnaEditar={true}
          peticionURL={"/datosMaquinarias.json"}
        />
      </section>
    </>
  );
};
