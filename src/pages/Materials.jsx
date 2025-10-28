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
import { Alert } from "../components/Alert";
import { ModalVerification } from "../components/ModalVerification";

export const Materials = () => {
  const [modal, setModal] = useState(false);
  const [tipoDeRecurso, setTipoDeRecurso] = useState("");
  const [datos, setDatos] = useState();
  const [msjBBDD, setMsjBBDD] = useState("");
  const { depositoId } = useParams();

  const [idUpdate, setIdUpdate] = useState(0);
  const [alertWithoutModal, setAlertWithoutModal] = useState(false);
  const [resultAPI, setResultAPI] = useState();
  const [deleteModal, setDeleteModal] = useState(0);

  useEffect(() => {
    document.title = "Materiales - ProStockConstructora";
    const rootDiv = document.getElementById("root");

    rootDiv.className = "pagedivided";
  }, []);

  useEffect(() => {
    RecargarTabla();
  }, [depositoId])

  useEffect(() => {
    if (alertWithoutModal) setTimeout(() => setAlertWithoutModal(false), 5000);
  }, [alertWithoutModal])

  useEffect(() => {
    if (idUpdate != 0) CargarDatos(idUpdate);
  }, [idUpdate]);

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
    RecursoServicio.traerRecursosDeDeposito(depositoId)
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
        setAlertWithoutModal(true);
        setResultAPI(d.data);
        CerrarModal(d.data);
      }).catch(e => {
        setAlertWithoutModal(true);
        console.log(e);
        setResultAPI("Error:" + e.response.data);
      });
  }

  const CargarDatos = (id) => {
    RecursoServicio.traerRecursoDepositoPorStockId(id)
      .then(d => {
        setValue("codigoISO", d.data.codigoISO);
        setValue("tipo", d.data.tipoRecurso);
        setValue("nombre", d.data.nombre);
        setValue("tipoMaterial.nombre", d.data.tipoMaterial);
        setValue("unidadDeMedida.nombre", d.data.unidadDeMedida);
        setValue("descripcion", d.data.descripcion);
        setValue("cantidad", d.data.cantidad);
        setValue("recursoId", d.data.idMaterial)

        handleInputChange("Tipo de recurso", d.data.tipoRecurso);
      })
      .catch(e => console.log(e));
  }

  const ActualizarRecurso = (datos) => {
    // CODIGO QUE TENES QUE HACER
    const datosLimpios = {
      ...datos,
      unidadDeMedida: datos.unidadDeMedida.nombre,
      tipoMaterial: datos.tipoMaterial.nombre
    };

    console.log(datosLimpios);
    RecursoServicio.actualizarRecurso(datosLimpios, depositoId)
      .then(d => {
        setAlertWithoutModal(true);
        setResultAPI(d.data);
        CerrarModal(d.data);
      }).catch(e => {
        setAlertWithoutModal(true);
        console.log(e);
        setResultAPI("Error:" + e.response.data);
      });
  }

  const EliminaRecurso = () => {
    RecursoServicio.eliminarRecurso(deleteModal)
      .then(d => {
        setAlertWithoutModal(true);
        setResultAPI(d.data);
        CerrarModal(d.data);
      }).catch(e => {
        setAlertWithoutModal(true);
        console.log(e);
        setResultAPI("Error:" + e.response.data);
      });
    setDeleteModal(0);
  }

  // MÉTODOS PARA FORM
  const onSubmit = (d) => {
    if (idUpdate == 0) CrearRecurso(d);
    else ActualizarRecurso(d);
  }

  const CerrarModal = (res = "") => {
    setModal(false);
    if (idUpdate != 0 || !res.includes("Error")) reset();
    if (!res.includes("Error")) RecargarTabla();
    setIdUpdate(0);
  }

  return (
    <>
      {
        alertWithoutModal ?
          <Alert resultAPI={resultAPI} setAlertWithoutModal={setAlertWithoutModal} />
          : <></>
      }
      {
        deleteModal != 0 ?
          <ModalVerification id={setDeleteModal}
            pregunta={"Está a punto de eliminar este registro ¿Está seguro que quiere hacerlo?"}
            setId={setDeleteModal} successHandle={EliminaRecurso} />
          : <></>
      }
      {
        modal ? // OnValidSubmit == handleSubmit
          <Form title={idUpdate == 0 ? "Añadir recurso" : "Actualizar recurso"}
            buttonMsg={idUpdate == 0 ? "Añadir" : "Actualizar"} closeModal={() => {
              setIdUpdate(0);
              CerrarModal();
            }}
            handleSubmit={handleSubmit(onSubmit)} onChange={handleInputChange}
            inputs={[
              {
                "type": "text",
                "icon": "qr_code",
                "info": "Código ISO",
                "register": register, // bind-Value=
                "registerData": "codigoISO", // Es para hacer el @recurso.CodigoISO
                "errors": errors // Mostrar el error
              },
              {
                "type": "select",
                "icon": "handyman",
                "info": "Tipo de recurso",
                "required": true,
                "select": [{ v: 0, tipo: "Material" }, { v: 1, tipo: "Maquina" }],
                "register": register,
                "registerData": "tipo",
                "errors": errors
              },
              {
                "type": "text",
                "icon": "settings_account_box",
                "info": "Nombre del recurso",
                "register": register,
                "registerData": "nombre",
                "errors": errors
              },
              {
                "type": "select",
                "icon": "texture",
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
                "icon": "straighten",
                "info": "Unidad de medida",
                "select": ["kg", "m", "l", "Bolsa x 50kg", "g"],
                "required": tipoDeRecurso === 0,
                "disabled": tipoDeRecurso === 1,
                "register": register,
                "registerData": "unidadDeMedida.nombre",
                "errors": errors
              },
              {
                "type": "text",
                "icon": "description",
                "info": "Descripción del recurso",
                "register": register,
                "registerData": "descripcion",
                "errors": errors
              },
              {
                "type": "number",
                "icon": "production_quantity_limits",
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
          <h1>Administrar recursos</h1>
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
          modalHandle={setModal}
          idHandle={setIdUpdate}
          deleteHandle={setDeleteModal}
        />
      </section>
    </>
  );
};
