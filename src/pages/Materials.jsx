import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";
import { Form } from "../components/Form";
import { LogOut } from "../components/LogOut";
import { useForm } from "react-hook-form";

import "../styles/Materials.css";
import "../styles/Table.css";
import RecursoServicio from "../services/RecursoServicio";
import CrearRecursoYUP from "../schemas/CrearRecursoYUP";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";

export const Materials = () => {
  const [modal, setModal] = useState(false);
  const [tipoDeRecurso, setTipoDeRecurso] = useState("");
  const [datos, setDatos] = useState();
  const [msjBBDD, setMsjBBDD] = useState("");
  const { depositoId } = useParams();

  useEffect(() => {
    document.title = "Materiales - ProStockConstructora";
    const rootDiv = document.getElementById("root");

    rootDiv.className = "pagedivided";
  }, []);

  useEffect(() => {
    RecargarTabla();
  }, [depositoId])

  // useForm --> EditForm
  // Model="pais" -> resolver: yupResolver(modelo(SCHEMA QUE CREAMOS CON YUP))
  // bind-Value --> register
  // fromState: {errors} -> ValidationMessage
  // reset -> "bind-values / register" -> Los vacia/Pone en nulo
  // setValue -> Asignar a una variable del YUP un valor (Este solo se usa para cuando usemos CargarDatos para después hacer un PUT)
  const { register, formState: { errors }, handleSubmit, reset, setValue }
    = useForm({ resolver: yupResolver(CrearRecursoYUP), mode: "onChange" });

  const handleInputChange = (field, value) => {
    if (field === "Tipo de recurso") {
      setTipoDeRecurso(Number(value));
    }
  };

  // MÉTODOS PARA CONECTAR AL BACKEND
  const RecargarTabla = () => {
    RecursoServicio.traerRecursorDeposito(depositoId)
      .then(r => {
        if (typeof r.data == "string") setMsjBBDD(r.data);
        else setDatos(r.data)
      })
      .catch(e => console.log(e));
  }

  const CrearRecurso = (datos) => {
    const datosLimpios = {
      ...datos,
      unidadDeMedida: {
        ...datos.unidadDeMedida,
        abreviacion: datos.unidadDeMedida.nombre
      }
    };

    RecursoServicio.crearRecurso(datosLimpios, depositoId)
      .then(d => {
        console.log(d);
        RecargarTabla();
      })
      .catch(e => console.log(e));
  }

  // METODOS PARA FORM
  const onSubmit = (d) => {
    CrearRecurso(d);
  }

  return (
    <>
      {
        modal ? // OnValidSubmit == handleSubmit
          <Form title={"Añadir recurso:"}
            buttonMsg={"Añadir"} closeModal={() => setModal(false)}
            handleSubmit={handleSubmit(onSubmit)} onChange={handleInputChange}
            inputs={[
              {
                "type": "text",
                "info": "Código ISO",
                "register": register, // bind-Value=
                "registerData": "codigoISO", // Es para hacer el @recurso.CodigoISO
                "errors": errors // Mostrar el error
              },
              {
                "type": "select",
                "info": "Tipo de recurso",
                "required": true,
                "select": [{ v: 0, tipo: "Material" }, { v: 1, tipo: "Maquina" }],
                "register": register,
                "registerData": "tipo",
                "errors": errors
              },
              {
                "type": "text",
                "info": "Nombre del recurso",
                "register": register,
                "registerData": "nombre",
                "errors": errors
              },
              {
                "type": "select",
                "info": "Tipo de material",
                "select": ["Vacío", "Cemento", "Acero", "Arena", "Grava", "Ladrillo", "Madera",
                  "Bloque", "Yeso", "Pintura"],
                "required": tipoDeRecurso === 0,
                "disabled": tipoDeRecurso === 1,
                "register": register,
                "registerData": "tipoMaterial.nombre",
                "errors": errors
              },
              {
                "type": "select",
                "info": "Unidad de medida",
                "select": ["kg", "m", "l", "bolsa"],
                "required": tipoDeRecurso === 0,
                "disabled": tipoDeRecurso === 1,
                "register": register,
                "registerData": "unidadDeMedida.nombre",
                "errors": errors
              },
              {
                "type": "text",
                "info": "Descripción del recurso",
                "register": register,
                "registerData": "descripcion",
                "errors": errors
              },
              {
                "type": "number",
                "info": "Cantidad disponible",
                "required": true,
                "register": register,
                "registerData": "cantidad",
                "errors": errors
              },
            ]}></Form> : <></>
      }
      <Sidebar />
      <section className="Materials">
        <LogOut />
        <div className="upPart">
          <h1>Administrar recursos (Depósito {depositoId}):</h1>
          <BotonAnadir setOnClick={() => setModal(true)}>Añadir recurso</BotonAnadir>
        </div>
        {
          msjBBDD ? <p>{msjBBDD}</p> : undefined
        }
        <Table
          eyeurl={"/materials/eye"}
          columnas={["Código ISO", "Nombre", "Tipo de recurso - Tipo Material", "Unidad", "Cantidad"]}
          camposAExcluir={["id"]}
          opciones={["editar", "eliminar"]}
          datos={datos}
        />
      </section>
    </>
  );
};
