import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";
import { Form } from "../components/Form";
import { LogOut } from "../components/LogOut";
import React from "react";
import "../styles/Materials.css";
import "../styles/Table.css";

export const Materials = () => {
  const [modal, setModal] = useState(false);
  const [tipoDeRecurso, setTipoDeRecurso] = useState("");

  useEffect(() => {
    document.title = "Materiales - ProStockConstructora";
    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  const handleInputChange = (field, value) => {
    if (field === "Tipo de recurso") {
      setTipoDeRecurso(value);
    }
  };

  return (
    <>
      {
        modal ?
          <Form title={"Añadir recurso:"} 
          buttonMsg={"Añadir"} closeModal={function () { setModal(false) }} 
          onChange={handleInputChange}
          inputs={[
            {
              "type": "text",
              "info": "Código ISO",
              "required": true,
            },
            {
              "type": "select",
              "info": "Tipo de recurso" ,
              "required": true,
              "select": ["Material", "Maquina"]
            },
            {
              "type": "select",
              "info": "Tipo de material",
              "required": false,
              "select": ["Vacío","Cemento", "Acero", "Arena", "Grava", "Ladrillo", "Madera", "Bloque", "Yeso", "Pintura", "Maquinaria pesada", "Herramientas manuales"]
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
              "required": tipoDeRecurso === "Material",
              "disabled": tipoDeRecurso === "Maquina",
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
          columnas={["Código ISO", "Nombre", "Tipo de recurso - Tipo Material", "Unidad", "Descripción"]}
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
