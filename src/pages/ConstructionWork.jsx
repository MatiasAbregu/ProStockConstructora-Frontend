import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";
import { Form } from "../components/Form";
import { LogOut } from '../components/LogOut';
import "../styles/ConstructionWork.css";
import "../styles/Table.css";
import ObraServicio from "../services/ObraServicio";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import CrearObraYUP from "../schemas/CrearObraYUP";
import { Alert } from "../components/Alert";

export const ConstructionWork = () => {

  const [modal, setModal] = useState(false);
  const [datos, setDatos] = useState();
  const [empresaId, setEmpresaId] = useState(1);

  const [idUpdate, setIdUpdate] = useState(0);
  const [alertWithoutModal, setAlertWithoutModal] = useState(false);
  const [resultAPI, setResultAPI] = useState();

  const [msjBBDD, setMsjBBDD] = useState("");

  const { register, formState: { errors }, handleSubmit, reset, setValue }
    = useForm({ resolver: yupResolver(CrearObraYUP), mode: "onChange" })

  //
  // USE EFFECTS
  //
  useEffect(() => {
    document.title = "Obras - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";

    RecargarTabla();
  }, []);

  useEffect(() => {
    if (alertWithoutModal) setTimeout(() => setAlertWithoutModal(false), 5000);
  }, [alertWithoutModal]);

  useEffect(() => {
    if (idUpdate != 0) CargarDatos(idUpdate);
  }, [idUpdate]);

  //
  // BACKEND
  //
  const RecargarTabla = () => {
    ObraServicio.obtenerObras(empresaId)
      .then(d => {
        if (typeof d.data == "string") setMsjBBDD(d.data);
        else {
          setDatos(d.data)
          setMsjBBDD("");
        }
      })
      .catch(e => console.log(e));
  }

  const CrearObra = (datos) => {
    const datosLimpios = {
      ...datos,
      empresaId: empresaId
    }

    ObraServicio.crearObra(datosLimpios)
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
    ObraServicio.obtenerObraPorId(id).then(d => {
      // d.data.id
      setValue("empresaId", empresaId);
      setValue("codigoObra", d.data.codigoObra);
      setValue("nombreObra", d.data.nombreObra);

      const estado = d.data.estado == "En proceso" ? 0 : d.data.estado == "Pausada" ? 1 : 2;
      setValue("estado", estado);
    })
  }

  const ActualizarObra = (datos) => {
    const datosLimpios = {
      id: idUpdate,
      ...datos
    };

    delete datosLimpios.empresaId;
    ObraServicio.actualizarObra(idUpdate, datosLimpios)
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

  //
  // FORM
  //
  const onSubmit = (datos) => {
    if (idUpdate == 0) CrearObra(datos);
    else ActualizarObra(datos);
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
        modal ?
          <Form title={idUpdate == 0 ? "Añadir obra" : "Actualizar obra"} buttonMsg={idUpdate == 0 ? "Añadir" : "Actualizar"}
            closeModal={() => {
              setIdUpdate(0);
              CerrarModal();
            }} handleSubmit={handleSubmit(onSubmit)} inputs={[
              {
                "type": "text",
                "icon": "qr_code",
                "info": "Código de la obra",
                "required": true,
                "register": register,
                "registerData": "codigoObra",
                "errors": errors
              },
              {
                "type": "text",
                "icon": "front_loader",
                "info": "Nombre de la obra",
                "required": true,
                "register": register,
                "registerData": "nombreObra",
                "errors": errors
              },
              {
                "type": "select",
                "icon": "overview",
                "info": "Estado de la obra",
                "select": [{ v: 0, estado: "En proceso" }, { v: 1, estado: "Pausada" }, { v: 2, estado: "Finalizada" }],
                "required": true,
                "register": register,
                "registerData": "estado",
                "errors": errors
              }
            ]}></Form> : <></>
      }

      <Sidebar />
      <section className="ConstructionWork">
        <LogOut />
        <h1>&nbsp;Gestionar obras</h1>
        <BotonAnadir setOnClick={() => setModal(true)}>Añadir obra</BotonAnadir>
        {
          msjBBDD ? <p className="msgBBDD">({msjBBDD})</p> : undefined
        }
        <Table
          columnas={["Código", "Nombre", "Estado"]}
          opciones={[{ to: {
            url: "/deposits/:id",
            icon: "garage_home"
          } }, "editar"]}
          camposAExcluir={["id"]}
          datos={datos}
          modalHandle={setModal}
          idHandle={setIdUpdate}
        />
      </section>
    </>
  );
};
