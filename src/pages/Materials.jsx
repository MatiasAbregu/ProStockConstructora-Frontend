import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";
import { useState } from "react";
import { Form } from "../components/Form";
import React from "react";
import "../styles/Materials.css";
import "../styles/Table.css";


export const Materials = () => {
  useEffect(() => {
    document.title = "Materiales - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  const[modal, setModal] = useState(false);
  
  return (
    <>
      {
         modal ? 
         <Form title={"Añadir material"} buttonMsg={"Añadir"} closeModal={function(){setModal(false)}} inputs={[
          {
            "type": "text",
            "info": "Código del material",
            "required": true
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
         ]}></Form>:<></>         
      }


      <Sidebar />
      <section className="Materials">
        <h1>Administrar Materiales:</h1>
        <BotonAnadir setOnClick={() => setModal(true)}>Añadir material</BotonAnadir>
        <Table
          columnas={["Código", "Nombre", "Descripción", "Cantidad", "Unidad", "Vencimiento"]}
          columnaEditar={true}
          datos={
             [
              {
                  "codigo": "ce_P",
                  "nombre": "Cemento",
                  "descripcion": "Cemento Portland",
                  "cantidad": 15,
                  "unidad": "BolsaX50kg",
                  "vencimiento": "09/09/2025"
              },
          
              {
                  "codigo": "ce_B",
                  "nombre": "Cemento",
                  "descripcion": "Cemento Blanco",
                  "cantidad": 20,
                  "unidad": "BolsaX30kg",
                  "vencimiento": "05/12/2025"
              },
             
              {
                  "codigo": "ac_A",
                  "nombre": "Aceros",
                  "descripcion": "Aceros de alta resistencia 40mm",
                  "cantidad": 20,
                  "unidad": "kg/m³",
                  "vencimiento": "02/08/2025"
              },
          
              {
                  "codigo": "ac_B",
                  "nombre": "Aceros",
                  "descripcion": "Aceros de baja resistencia 20mm",
                  "cantidad": 150,
                  "unidad": "kg/m³",
                  "vencimiento": "19/10/2025"
              },
          
              {
                  "codigo": "al_E",
                  "nombre": "Aluminio",
                  "descripcion": "Aluminio para estructuras",
                  "cantidad": 300,
                  "unidad": "kg/m³",
                  "vencimiento": "30/11/2025"
              },
          
              {
                  "codigo": "al_R",
                  "nombre": "Aluminio",
                  "descripcion": "Aluminio para revestimientos",
                  "cantidad": 250,
                  "unidad": "kg/m³",
                  "vencimiento": "09/09/2025"
              } 
            ]
          }
        />
      </section>
    </>
  );
};
