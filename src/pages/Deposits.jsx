import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import "../styles/Deposits.css";
import "../styles/Table.css";

export const Deposits = () => {
  useEffect(() => {
    document.title = "Depósitos - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="Deposits">
        <Table
          columnas={["Código","Ubicacion","Obra"]}
          columnaEditar={true}
          peticionURL={"/datosDepositos.json"}
        />
      </section>
    </>
  );
};
