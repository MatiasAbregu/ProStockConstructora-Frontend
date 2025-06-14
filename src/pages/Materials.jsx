import { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { ButtonMenu } from "../components/ButtonMenu";
import { Table } from "../components/Table";
import "../styles/Materials.css";
import "../styles/Table.css";

export const Materials = () => {
  useEffect(() => {
    document.title = "Materiales - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  return (
    <>
      <Sidebar />
      <section className="Materials">
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
