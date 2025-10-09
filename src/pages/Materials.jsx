import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";
import { useState } from "react";
import { Form } from "../components/Form";
import { LogOut } from "../components/LogOut";
import React from "react";
import "../styles/Materials.css";
import "../styles/Table.css";

export const Materials = () => {
  useEffect(() => {
    document.title = "Materiales - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  const [modal, setModal] = useState(false);

  return (
    <>
      {
        modal ?
          <Form title={"Añadir recurso:"} 
          buttonMsg={"Añadir"} closeModal={function () { setModal(false) }} 
          inputs={[
            {
              "type": "select",
              "info": "Código de recurso",
              "required": true,
              "select": ["ce_P", "ce_B", "ac_A"],
            },
            {
              "type": "select",
              "info": "Tipo de recurso" ,
              "required": true,
              "select": ["Material", "Maquina"]
            },
            {
              "type": "text",
              "info": "Nombre del recurso",
              "required": true
            },
            {
              "type": "text",
              "info": "Descripción del recurso",
              "required": true
            },
            {
              "type": "number",
              "info": "Cantidad disponible",
              "required": true
            },
            {
              "type": "text",
              "info": "Unidad de medida",
              "required": true
            }
          ]}></Form> : <></>
      }
      <Sidebar />
      <section className="Materials">
        <LogOut />
        <div className="upPart">
          <h1>Administrar recursos:</h1>
          <BotonAnadir setOnClick={() => setModal(true)}>Añadir recurso</BotonAnadir>
        </div>
        <Table
          eyeurl={"/materials/eye"}
          columnas={["Código ISO", "Nombre", "Tipo de recurso", "Tipo", "Unidad"]}
          opciones={[{ eye: "/materials/eye" }, "editar", "eliminar"]}
          datos={
            [
              
            ]
          }
        />
      </section>
    </>
  );
};
