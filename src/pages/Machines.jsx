import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";
import { Form } from "../components/Form";
import { LogOut } from '../components/LogOut';

import "../styles/Machines.css";
import "../styles/Table.css";

export const Machines = () => {
  useEffect(() => {
    document.title = "Maquinaria - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  const [modal, setModal] = useState(false);

  return (
    <>
      {
        modal ?
          <Form title={"Añadir maquinaria disponible"} buttonMsg={"Añadir"} closeModal={function () { setModal(false) }} inputs={[
            {
              "type": "text",
              "info": "Código de la máquina",
              "required": true
            },
            {
              "type": "text",
              "info": "Nombre de la máquina",
              "required": true
            },
            {
              "type": "text",
              "info": "Descripción de la máquina",
              "required": true
            },
            {
              "type": "date",
              "info": "Fecha de mantenimiento",
              "required": true
            },
            {
              "type": "select",
              "select": [
                { "value": "disponible", "label": "Disponible" },
                { "value": "no disponible", "label": "No disponible" }
              ],
              "info": "Disponibilidad",
              "required": true
            }
          ]}></Form> : <></>
      }

      <Sidebar />
      <section className="Machines">
        <LogOut />
        <div className="upPart">
          <h1>Administrar Máquinas:</h1>
          <BotonAnadir setOnClick={() => setModal(true)}>Añadir maquinaria</BotonAnadir>
        </div>
        <Table
          columnas={["Código", "Nombre", "Descripción", "Fecha Ult. Mantenimiento", "Disponibilidad"]}
          opciones={["editar", "eliminar"]}
          datos={
            [
              {
                "codigo": "ExC_01",
                "nombre": "Excavadora",
                "descripcion":
                  "Máquina pesada utilizada para excavar y mover tierra.",
                "fecha_mantenimiento": "02-06-2025",
                "disponibilidad": "Disponible",
              },
              {
                "codigo": "Bul_02",
                "nombre": "Bulldozer",
                "descripcion":
                  "Vehículo de construcción con una gran hoja frontal para mover materiales.",
                "fecha_mantenimiento": "10-04-2025",
                "disponibilidad": "Disponible",
              },
              {
                "codigo": "Gru_03",
                "nombre": "Grúa",
                "descripcion":
                  "Máquina utilizada para levantar y mover objetos pesados.",
                "fecha_mantenimiento": "29-12-2024",
                "disponibilidad": "No disponible",
              },
              {
                "codigo": "Ret_04",
                "nombre": "Retroexcavadora",
                "descripcion":
                  "Máquina que combina las funciones de una excavadora y un cargador frontal.",
                "fecha_mantenimiento": "08-05-2025",
                "disponibilidad": "Disponible",
              },
            ]
          }
        />
      </section>
    </>
  );
};
