import React from "react";
import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { BotonVolver } from "../components/BotonVolver";
import { Table } from "../components/Table";
import '../styles/BotonVolver.css';


export const MaterialsDetails = () => {
  useEffect(() => {
    document.title = "Detalles de Materiales - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <BotonVolver onClick={() => window.history.back()} />
      <section className="MaterialsDetails">
        <h1>Detalles del Material</h1>
        {/* Aquí se pueden agregar más detalles específicos del material */}
        <Table
          columnas={["Nombre", "Descripción", "Cantidad", "Precio"]}
            datos={[
              { nombre: "Cemento", descripcion: "Cemento Portland", cantidad: "100", precio: "$500000" },
            ]}
        /> 
       </section>           
    </>
  );
}