import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";
import { useState } from "react";
import { Form } from "../components/Form";
import React from "react";
import "../styles/ConstructionWork.css";
import "../styles/Table.css";

export const ConstructionWork = () => {
  useEffect(() => {
    document.title = "Obras - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  const [modal, setModal] = useState(false);

  return (
    <>
      {
         modal ? 
         <Form title={"Añadir obra"} buttonMsg={"Añadir"} closeModal={function() {setModal(false)}} inputs={[
          {
            "type": "text",
            "info": "Código de la obra",
            "required": true
          },
          {
            "type": "text",
            "info": "Nombre de la obra",
            "required": true
          },
          {
            "type": "text",
            "info": "Empresa responsable",
            "required": true
          },
          {
            "type": "select",
            "info": "Estado de la obra",
            "select": ["En curso", "En pausa", "Finalizada", "Cancelada"],
            "required": true
          }
        ]}></Form> : <></>
    }

      <Sidebar />
      <section className="ConstructionWork">
        <BotonAnadir setOnClick={()=> setModal(true)}>Añadir obra</BotonAnadir>
        <Table
          columnas={["Código", "Nombre de obra", "Empresa", "Estado"]}
          columnaEditar={true}
          datos={[
            {
              codigo: 1,
              nombreObra: "Parque Industrial Norte",
              empresa: "G.C. CONSTRUCCIONES S.A.S",
              estado: "En curso",
            },
            {
              codigo: 2,
              nombreObra: "Proyecto Oasis XXI",
              empresa: "MURO Arquitectos",
              estado: "Finalizada",
            },
            {
              codigo: 3,
              nombreObra: "Complejo Los Álamos",
              empresa: "URBICOR Construcciones",
              estado: "En pausa",
            },
          ]}
        />
      </section>
    </>
  );
};
