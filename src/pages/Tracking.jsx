import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { ButtonMenu } from "../components/ButtonMenu";
import "../styles/Tracking.css";
import { Table } from "../components/Table";


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

        <h1>Administración de pedidos:</h1>
        <Table
          columnas={["Nº Pedido", "Fecha Pedido", "Estado", "Fecha Estimada", "Detalle de Pedido", "Obra que lo solicito"]}
          columnaEditar={true}
          datos={
             [
              {
                  "codigopedido": "3252",
                  "fecha_pedido": "15-01-25",
                  "estado": "En camino",
                  "fecha_entrega": "15-05-26",
                  "detalle_pedido": "50kg cemento",
                  "deposito_solicito": "Obra 1"
              },

              {
                  "codigopedido": "3112",
                  "fecha_pedido": "05-01-25",
                  "estado": "En camino",
                  "fecha_entrega": "15-05-26",
                  "detalle_pedido": "50kg cemento",
                  "deposito_solicito": "Obra 2"
              },

              {
                  "codigopedido": "3000",
                  "fecha_pedido": "15-01-25",
                  "estado": "En camino",
                  "fecha_entrega": "15-05-26",
                  "detalle_pedido": "50kg cemento",
                  "deposito_solicito": "Obra 3"
              },

              {
                  "codigopedido": "3200",
                  "fecha_pedido": "15-01-25",
                  "estado": "En camino",
                  "fecha_entrega": "15-05-26",
                  "detalle_pedido": "50kg cemento",
                  "deposito_solicito": "Obra 4"
              }             
              
            ]
          }
        />         
    
      </section>
    </>
  );
};
