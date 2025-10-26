import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import "../styles/Tracking.css";
import { Table } from "../components/Table";
import { LogOut } from '../components/LogOut';

export const Tracking = () => {
  useEffect(() => {
    document.title = "Seguimiento - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="Tracking">
        <LogOut />
        <h1>Administrar pedidos:</h1>
        <Table
          columnas={["Nº Pedido", "Origen - Destino", "Fecha Entrega / Estimada", "Fecha recibida Prod"]}
          opciones={[{eye: "/NotaDePedidos"},"editar", "eliminar"]}
          datos={
            [
              {
                "codigopedido": "3252",
                "origen y destino": "Obra 1 - Obra 2",
                "fecha_entrega/ estimada": "15-05-26 / 16-05-26",
                "fecha_recibida_prod": "16-05-26"
              },

              {
                "codigopedido": "3333",
                "origen y destino": "Obra 3 - Obra 4",
                "fecha_entrega/ estimada": "17-05-26 / 18-05-26",
                "fecha_recibida_prod": "19-05-26"
              },

              {
                "codigopedido": "4343",
                "origen y destino": "Obra 6 - Obra 2",
                "fecha_entrega/ estimada": "20-05-26 / 22-05-26",
                "fecha_recibida_prod": "22-05-26"
              },

            ]
          }
        />
      </section>
    </>
  );
};
