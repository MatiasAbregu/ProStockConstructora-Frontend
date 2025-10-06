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

  const Lotes = [
    { codigo: "ce_P", material: "Cemento", descripcion: "Cemento Portland", cantidad: 50, unidad: "BolsaX50kg" },
    { codigo: "ce_B", material: "Cemento", descripcion: "Cemento Blanco", cantidad: 50, unidad: "BolsaX50kg" },
    { codigo: "ac_A", material: "Acero", descripcion: "Aceros de alta resistencia 40mm", cantidad: 50, unidad: "kg/m³" },
    { codigo: "ac_B", material: "Acero", descripcion: "Aceros de baja resistencia 20mm", cantidad: 50, unidad: "kg/m³" },
    { codigo: "al_E", material: "Aluminio", descripcion: "Aluminio para estructuras", cantidad: 50, unidad: "kg/m³" },
    { codigo: "al_R", material: "Aluminio", descripcion: "Aluminio para revestimiento", cantidad: 50, unidad: "kg/m³" }
  ]

  const [modal, setModal] = useState(false);

  return (
    <>
      {
        modal ?
          <Form title={"Añadir Lote:"} buttonMsg={"Añadir"} closeModal={function () { setModal(false) }} inputs={[
            {
              "type": "select",
              "info": "Código de Lote",
              "required": true,
              "select": ["ce_P", "ce_B", "ac_A"],
            },
            {
              "type": "text",
              "info": "Nombre del material",
              "required": true
            },
            {
              "type": "text",
              "info": "Descripción del material",
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
            },
            {
              "type": "date",
              "info": "Fecha de vencimiento",
              "required": true
            }
          ]}></Form> : <></>
      }
      <Sidebar />
      <section className="Materials">
        <LogOut />
        <div className="upPart">
          <h1>Administrar materiales:</h1>
          <BotonAnadir setOnClick={() => setModal(true)}>Añadir Material</BotonAnadir>
        </div>
        <Table
          eyeurl={"/materials/eye"}
          columnas={["Código", "Nombre", "Unidad"]}
          opciones={[{eye: "/materials/eye"}, "editar", "eliminar"]}
          datos={
            [
              {
                "codigo": "ce_P",
                "nombre": "Cemento",
                "unidad": "kg",
              },

              {
                "codigo": "ce_B",
                "nombre": "Cemento",
                "unidad": "kg",
              },

              {
                "codigo": "ac_A",
                "nombre": "Aceros",
                "unidad": "kg/m³",
              },

              {
                "codigo": "ac_B",
                "nombre": "Aceros",
                "unidad": "kg/m³",
              },

              {
                "codigo": "al_E",
                "nombre": "Aluminio",
                "unidad": "kg/m³",
              },

              {
                "codigo": "al_R",
                "nombre": "Aluminio",
                "unidad": "kg/m³",
              }
            ]
          }
        />
      </section>
    </>
  );
};
