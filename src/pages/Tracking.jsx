import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
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
       <Table
        columnas={["Cliente", "Producto","Cantidad","Unidad","Fecha de pedido", "Estado", "Obra"]}
        columnaEditar={true}
        peticionURL={"/datosPedidos.json"}
       />
      </section>
    </>
  );
};
