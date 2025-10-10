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
          columnas={["Código", "Material", "Cantidad", "Unidad de medida", "Estado"]}
          opciones={["editar", "eliminar"]}
            datos={[
                { "Código": "NP001", 
                    "Material": "Cemento", 
                    "Cantidad": 100, 
                    "Unidad de medida": "sacos", 
                    "Estado": "Pendiente" },
                { "Código": "NP002", 
                    "Material": "Ladrillos", 
                    "Cantidad": 500,
                    "Unidad de medida": "cajas", 
                    "Estado": "Pendiente" }
            ]}
        />
      </section>
    </>
  );
}
