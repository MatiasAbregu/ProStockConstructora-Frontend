import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { ButtonMenu } from "../components/ButtonMenu";
import { Table } from "../components/Table";
import "../styles/Materials.css";
import "../styles/Table.css";

export const Materials = () => {
  useEffect(() => {
    document.title = "Materiales - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="Materials">
        <Table
          columnas={["Código", "Nombre", "Descripción", "Cantidad", "Unidad", "Vencimiento"]}
          columnaEditar={true}
          peticionURL={"/datosMateriales.json"}
        />
      </section>
    </>
  );
};
