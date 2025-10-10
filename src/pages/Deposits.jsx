import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";
import "../styles/Deposits.css";
import { LogOut } from '../components/LogOut';
import "../styles/Table.css";
import { Form } from "../components/Form";


export const Deposits = () => {
  useEffect(() => {
    document.title = "Depósitos - ProStockConstructora";
   
    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  const [modal, setModal] = useState(false);
  const [idUpdate, setIdUpdate] = useState(0);

  return (
    <>
    {
      modal ?
    <Form title={"Generar Nuevo pedido"} buttonMsg={"Crear pedido"} closeModal={function () { setModal(false) }} inputs={[
      {
        "type": "text",
        "info": "Nombre del material",
        "required": true
      },
      {
        "type": "number",
        "info": "Cantidad",
        "required": true
      },
      {
        "type": "text",
        "info": "Unidad de medida",
        "required": true
      }

    ]} /> : <></>

    }
      <Sidebar />
      <section className="Deposits">
        <LogOut />
        <div className="upPart">
        <h1>Administrar Depósitos:Parque Industrial Norte</h1>
        <BotonAnadir setOnClick={() => setModal(true)}>Generar nuevo pedido</BotonAnadir>
        </div>
        <Table
          columnas={["Codigo - tipo Deposito"]}
          opciones={[{eye: "/materials"}, "editar", "eliminar"]}
          datos={[
            {
              "Codigo": "DEP001- Buen estado",
              
            },
            {
              "Codigo": "DEP002- En Uso",
              
            },
            {
              "Codigo": "DEP003- Desechos",
              
            }

        ]}
      />
      </section>
    </>
  );
};
