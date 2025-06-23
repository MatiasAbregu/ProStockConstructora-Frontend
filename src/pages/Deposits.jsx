import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { ButtonMenu } from "../components/ButtonMenu";
import { Table } from "../components/Table";
import "../styles/Deposits.css";



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
        <h2>Administrar Depósitos</h2>
        <Table
          columnas={["Codigo", "Direccion", "Obra"]}
          columnaEditar={true}
          datos={[
            {
              "Codigo": "DEP001",
              "Direccion": "Calle Falsa 123",
              "Obra": "Edificio Central"
            },
            {
              "Codigo": "DEP002",
              "Direccion": "Avenida Siempre Viva 456",
              "Obra": "Plaza Mayor"
            },
            {
              "Codigo": "DEP003",
              "Direccion": "Boulevard de los Sueños Rotos 789",
              "Obra": "Parque Industrial"
            }
          ]}
        />
      </section>
    </>
  );
};
