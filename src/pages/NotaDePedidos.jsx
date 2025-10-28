import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { LogOut } from "../components/LogOut";
import "../styles/Table.css";
import "../styles/NotaDePedidos.css";

export const NotaDePedido = () => {
  useEffect(() => {
    document.title = "Nota de Pedido - ProStockConstructora";
    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  const [modal, setModal] = useState(false);

  return (
    <>
      <Sidebar />
      <section className="NotaDePedido">
        <LogOut />
        <h1>Nota de Pedido</h1>
        <Table
          columnas={["Código-Material", "Cantidad", "Deposito","Fecha Emision", "Estado"]}
          opciones={["editar", "eliminar"]}
            datos={[
                { "Código-Material": "NP001- Cemento", 
                    "Cantidad": 100, 
                    "Deposito": "Parque Industrial Norte",
                    "Fecha Emision": "20/06/2024", 
                    "Estado": "Pendiente" },
                { "Código-Material": "NP002- Ladrillos", 
                    "Cantidad": 500, 
                    "Deposito": "Parque Industrial Norte", 
                    "Fecha Emision": "21/06/2024", 
                    "Estado": "Pendiente" }
            ]}
        />
      </section>
    </>
  );
}
