import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";
import '../styles/Empresas.css';

export const Enterprises = () => {
  useEffect(() => {
    document.title = "Empresas - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="Enterprises">
        <BotonAnadir>Añadir empresa</BotonAnadir>
        <Table
          columnas={["Código", "Nombre", "CUIT", "Razón social", "Estado"]}
          columnaEditar={true}
          peticionURL={"/datosEmpresas.json"}
        />
      </section>
    </>
  );
};
