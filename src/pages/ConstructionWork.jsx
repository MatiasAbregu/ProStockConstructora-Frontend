import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";
import '../styles/ConstructionWork.css';

export const ConstructionWork = () => {
  useEffect(() => {
    document.title = "Obras - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="ConstructionWork">
        <BotonAnadir>Añadir obra</BotonAnadir>
        <Table
          columnas={["Código", "Estado", "Nombre de obra", "Empresa"]}
          peticionURL={"/datosObras.json"}
        />
      </section>
    </>
  );
};
