import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";
import "../styles/Deposits.css";
import { LogOut } from '../components/LogOut';
import "../styles/Table.css";
import { Form } from "../components/Form";
import { useParams } from "react-router-dom";
import DepositoServicio from "../services/DepositoServicio";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import DepositoYUP from "../schemas/DepositoYUP";
import { VisualForm } from '../components/VisualForm';

const provincias = [
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
  "Tucumán"
];

export const Deposits = () => {

  const [modal, setModal] = useState(false);
  const [modalPedido, setModalPedido] = useState(false);
  const [modalLocation, setModalLocation] = useState(false);

  const [datos, setDatos] = useState();
  const { obraId } = useParams();
  const [msjBBDD, setMsjBBDD] = useState("");

  const [idUpdate, setIdUpdate] = useState(0);
  const [alertWithoutModal, setAlertWithoutModal] = useState(false);
  const [resultAPI, setResultAPI] = useState();

  const { register, handleSubmit, formState: { errors }, setValue, reset }
    = useForm({ resolver: yupResolver(DepositoYUP), mode: "onChange" });

  //
  // USE EFFECTS
  //
  useEffect(() => {
    document.title = "Depósitos - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  useEffect(() => {
    RecargarTabla();
  }, [obraId])

  useEffect(() => {
    if (alertWithoutModal) setTimeout(() => setAlertWithoutModal(false), 5000);
  }, [alertWithoutModal])

  useEffect(() => {
    if (idUpdate != 0) CargarDatos(idUpdate);
  }, [idUpdate]);

  //
  // BACKEND
  //
  const RecargarTabla = () => {
    DepositoServicio.obtenerDepositosDeObra(obraId)
      .then(d => {
        if (typeof d.data == "string") setMsjBBDD(d.data);
        else {
          setDatos(d.data)
          setMsjBBDD("");
        }
      })
      .catch(e => console.log(e));
  }

  const CrearDeposito = (datos) => {
    datos.obraId = obraId;
    DepositoServicio.crearDeposito(datos)
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

  }

  // FORM
  const onSubmit = (datos) => {
    if (idUpdate == 0) CrearDeposito(datos);
    //else ActualizarObra(datos);
  }

  const CerrarModal = (res = "") => {
    setModal(false);
    setModalPedido(false);
    setModalLocation(false);
    if (idUpdate != 0 || !res.includes("Error")) reset();
    if (!res.includes("Error")) RecargarTabla();
    setIdUpdate(0);
  }

  return (
    <>
      {
        modalPedido ?
          <Form title={"Generar nuevo pedido"} buttonMsg={"Crear pedido"}
            closeModal={() => setModalPedido(false)} inputs={[
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
      {
        modal ?
          <Form title={idUpdate == 0 ? "Añadir depósito" : "Actualizar depósito"} buttonMsg={idUpdate == 0 ? "Añadir" : "Actualizar"} 
          closeModal={() => setModal(false)}
            handleSubmit={handleSubmit(onSubmit)}
            inputs={[
              {
                "type": "text",
                "icon": "qr_code",
                "info": "Código de depósito",
                "required": true,
                "register": register,
                "registerData": "codigoDeposito",
                "errors": errors
              },
              {
                "type": "text",
                "icon": "garage_home",
                "info": "Nombre de depósito",
                "required": true,
                "register": register,
                "registerData": "nombreDeposito",
                "errors": errors
              },
              {
                "type": "select",
                "icon": "list_alt",
                "info": "Tipo de depósito",
                "required": true,
                "select": [{ v: 0, tipo: "Disponible" }, { v: 1, tipo: "En uso" }, { v: 2, tipo: "Pérdidas" }],
                "register": register,
                "registerData": "tipoDeposito",
                "errors": errors
              },
              {
                "type": "text",
                "icon": "location_searching",
                "info": "Código de ubicación",
                "required": true,
                "register": register,
                "registerData": "ubicacion.codigoUbicacion",
                "errors": errors
              },
              {
                "type": "text",
                "icon": "location_on",
                "info": "Ubicación",
                "required": true,
                "register": register,
                "registerData": "ubicacion.ubicacionDomicilio",
                "errors": errors
              },
              {
                "type": "select",
                "icon": "location_chip",
                "info": "Provincia",
                "select": provincias,
                "register": register,
                "registerData": "ubicacion.provincia.nombreProvincia",
                "errors": errors
              }
            ]} />
          : <></>
      }
      {
        modalLocation ?
          <VisualForm closeModal={() => CerrarModal()} title={"Datos de ubicación"}
            inputs={[{
              "type": "text",
              "info": "Código de ubicación",
              "icon": "location_searching",
            },
            {
              "type": "text",
              "info": "Ubicación",
              "icon": "location_on"
            },
            {
              "type": "text",
              "info": "Provincia",
              "icon": "location_chip"
            }
            ]} />
          :
          <></>
      }
      <Sidebar />
      <section className="Deposits">
        <LogOut />
        <h1>Gestionar depósitos</h1>
        <div className="upPart">
          <BotonAnadir setOnClick={() => setModalPedido(true)}>Generar nuevo pedido</BotonAnadir>
          <BotonAnadir setOnClick={() => setModal(true)}>Añadir depósito</BotonAnadir>
        </div>
        {
          msjBBDD ? <p style={{ textAlign: "center", width: "100%", marginTop: "2%" }}>({msjBBDD})</p> : undefined
        }
        <Table
          columnas={["Código", "Nombre", "Tipo de depósito"]}
          opciones={[{ location: setModalLocation }, { to: { url: "/materials/:id", icon: "construction" } }, "editar", "eliminar"]}
          camposAExcluir={["id", "ubicacion", "provincia"]}
          modalHandle={setModal}
          idHandle={setIdUpdate}
          datos={datos}
        />
      </section>
    </>
  );
};
