import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";
import { Form } from "../components/Form";
import { LogOut } from "../components/LogOut";
import React from "react";
import "../styles/Materials.css";
import "../styles/Table.css";
import RecursoServicio from "../services/RecursoServicio";

export const Materials = () => {
  const [modal, setModal] = useState(false);
  const [tipoDeRecurso, setTipoDeRecurso] = useState("");
  const [datos, setDatos] = useState();
  const [msjBBDD, setMsjBBDD] = useState("");

  useEffect(() => {
    document.title = "Materiales - ProStockConstructora";
    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  useEffect(() => {
    const id = 1;
    RefrescarTabla(id);
  }, [])

  const handleInputChange = (field, value) => {
    if (field === "Tipo de recurso") {
      setTipoDeRecurso(value);
    }
  };

  // MÉTODOS PARA CONECTAR AL BACKEND

  const RefrescarTabla = (id) => {
    RecursoServicio.traerRecursorDeposito(id)
      .then(r => {
        if (typeof r.data == "string") setMsjBBDD(r.data);
        else setDatos(r.data)
      })
      .catch(e => console.log(e));
  }

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
                "info": "Tipo de recurso",
                "required": true,
                "select": ["Material", "Maquina"]
              },
              {
                "type": "text",
                "info": "Nombre del recurso",
                "required": true
              },
              {
                "type": "select",
                "info": "Tipo de material",
                "select": ["Vacío", "Cemento", "Acero", "Arena", "Grava", "Ladrillo", "Madera", "Bloque", "Yeso", "Pintura", "Maquinaria ,pesada", "Herramientas manuales"],
                "required": tipoDeRecurso === "Material",
                "disabled": tipoDeRecurso === "Maquina",
              },
              {
                "type": "select",
                "info": "Unidad de medida",
                "select": ["kilogramo", "metro", "litro", "bolsa"],
                "required": tipoDeRecurso === "Material",
                "disabled": tipoDeRecurso === "Maquina",
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
            ]}></Form> : <></>
      }
      <Sidebar />
      <section className="Materials">
        <LogOut />
        <div className="upPart">
          <h1>Administrar recursos:</h1>
          <BotonAnadir setOnClick={() => setModal(true)}>Añadir recurso</BotonAnadir>
        </div>
        {
          msjBBDD ? <p>{msjBBDD}</p> : undefined
        }
        <Table
          eyeurl={"/materials/eye"}
          columnas={["Código ISO", "Nombre", "Tipo de recurso - Tipo Material", "Unidad", "Cantidad"]}
          camposAExcluir={["id"]}
          opciones={[{ eye: "/materials/eye" }, "editar", "eliminar"]}
          datos={datos}
        />       
      </section>
    </>
  );
};
