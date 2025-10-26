import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { useState } from "react";
import { Form } from "../components/Form";
import "../styles/Table.css";

export const PendingOrders = () => {
  useEffect(() => {
    document.title = "Órdenes pendientes - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="PendingOrders">
        <Table
          columnas={["Código - Nombre - Empresa", "Estado"]} 

          datos={[
            {
              codigo: "1 - Parque Industrial Norte / G.C.Construcciones",
              estado: "En curso",
            },
            {
              codigo: "2 - Proyecto Oasis XXI / MURO Arquitectos",
              estado: "Finalizada",
            },
            {
              codigo: "3 - Edificio Central / Constructora ABC",
              estado: "En pausa",
            },
          ]}
        />
      </section>
    </>
  );
}