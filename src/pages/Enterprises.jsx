import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";
import { BotonAnadir } from "../components/BotonAnadir";
import { BotonBuscar } from "../components/BotonBuscar";
import { InputForm } from "../components/InputForm";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import '../styles/Empresas.css';
import '../styles/Modal.css';
import EmpresaServicio from "../services/EmpresaServicio";
import EmpresaYUP from "../schemas/EmpresaYUP";
import InputControl from "../validation/InputControl";
import { Form } from "../components/Form";

// Limpiar datos

export const Enterprises = () => {

  // USE STATES
  const [rol, setRol] = useState("Superadministrador");
  const [datos, setDatos] = useState([]);

  // Activamos y desactivamos desde acá el modal con el formulario
  const [modal, setModal] = useState(false);
  
  const [alertMSGAPI, setAlertMSGAPI] = useState(false);
  const [resultAPI, setResultAPI] = useState();

  const [idUpdate, setIdUpdate] = useState(0);
  const [alertWithoutModal, setAlertWithoutModal] = useState(false);

  // USE EFFECTS
  useEffect(() => {
    document.title = "Empresas - ProStockConstructora";

    const rootDiv = document.getElementById("root");
    rootDiv.className = "pagedivided";
  }, []);

  useEffect(() => {
    if (rol == "Superadministrador") {
      RecargarTabla();
    }
  }, [rol]);

  useEffect(() => {
    if (idUpdate != 0) CargarDatos(idUpdate);
  }, [idUpdate]);

  // YUP
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({ resolver: yupResolver(EmpresaYUP), mode: "onChange" });

  // API BACKEND REQUESTS
  const RecargarTabla = () => {
    EmpresaServicio.obtenerEmpresas().then(datos => setDatos(datos.data));
  }

  const CrearEmpresa = (datos) => {
    if (rol == "Superadministrador") {
      EmpresaServicio.crearEmpresa(datos).then(d => {
        setAlertMSGAPI(true);
        setResultAPI(d.data);
      }).catch(e => {
        setAlertMSGAPI(true);
        setResultAPI("Error:" + e.response.data);
      });
    }
  }

  const CargarDatos = (id) => {
    EmpresaServicio.obtenerEmpresaPorId(id).then(d => {
      setValue("Id", d.data.id);
      setValue("CUIT", d.data.cuit);
      setValue("NombreEmpresa", d.data.nombre);
      setValue("RazonSocial", d.data.razonSocial);
      setValue("Email", d.data.email);
      setValue("Estado", d.data.estado == "Activo" ? true : false);
      setValue("Celular", d.data.telefono);
    })
  }

  const ActualizaEmpresa = (datos) => {
    EmpresaServicio.actualizarEmpresa(idUpdate, datos).then(d => {
      setAlertMSGAPI(true);
      setResultAPI(d.data);
    }).catch(e => {
      setAlertMSGAPI(true);
      setResultAPI("Error:" + e.response.data);
    });
  }

  const CambiarEstado = async (id) => {
    await EmpresaServicio.cambiarEstadoEmpresa(id).then(d => {
      setAlertWithoutModal(true);
      setResultAPI(d.data);
    }).catch(e => {
      setAlertWithoutModal(true);
      setResultAPI("Error:" + e.response.data);
    });
    RecargarTabla();
  }

  // MODAL
  const onSubmit = (d) => {
    if (idUpdate == 0) CrearEmpresa(d);
    else ActualizaEmpresa(d);
  }

  // const onErrors = (e) => {
  //   console.log("Errores:", e);
  // }

  const CerrarModal = () => {
    setModal(false);
    if (idUpdate != 0 || !resultAPI.includes("Error")) reset();
    if(!resultAPI.includes("Error")) RecargarTabla();
    setIdUpdate(0);
  }

  return (
    <>
      {
        alertWithoutModal ?
          <div className={`alertContainer ${resultAPI.includes("Error") ? "FRerror" : "FRexito"}`}>
            <div>
              <p>{resultAPI.includes("Error:") ? resultAPI.split(":")[1] : resultAPI}</p>
              <span onClick={() => setAlertWithoutModal(false)}>X</span>
            </div>
          </div>
          : <></>
      }
      {
        modal ?
          <Form title={idUpdate == 0 ? "Registrar empresa" : "Actualizar empresa"}
            buttonMsg={idUpdate == 0 ? "Añadir empresa" : "Actualizar empresa"}
            handleSubmit={handleSubmit(onSubmit)} closeModal={CerrarModal} 
            setAlertMSGAPI={setAlertMSGAPI} alertMSGAPI={alertMSGAPI} resultAPI={resultAPI}
            inputs={[
              {
                "type": "text",
                "required": true,
                "icon": "domain",
                "register": register,
                "registerData": "NombreEmpresa",
                "errors": errors,
                "info": "Ingrese el nombre de la empresa:"
              },
              {
                "type": "text",
                "required": true,
                "icon": "description",
                "register": register,
                "registerData": "CUIT",
                "errors": errors,
                "keyHandle": e => InputControl.soloNumeros(e),
                "info": "Ingrese el CUIT:"
              },
              {
                "type": "select",
                "select": ["Sociedad de Responsabilidad Limitada (S.R.L.)", "Sociedad Anónima (S.A.)", "Sociedad por Acciones Simplificada (S.A.S.)"],
                "icon": "balance",
                "register": register,
                "registerData": "RazonSocial",
                "errors": errors,
                "info": "Ingrese la razón social:"
              },
              {
                "type": "tel",
                "icon": "call",
                "register": register,
                "registerData": "Celular",
                "errors": errors,
                "keyHandle": e => InputControl.soloNumeros(e),
                "info": "Ingrese el teléfono (opcional):"
              },
              {
                "type": "email",
                "icon": "mail",
                "register": register,
                "registerData": "Email",
                "errors": errors,
                "info": "Ingrese el email (opcional):"
              }
            ]} />
          :
          <></>
      }
      <Sidebar />
      <section className="Enterprises">
        <BotonBuscar>Buscar</BotonBuscar>
        <BotonAnadir setOnClick={() => setModal(true)}>Añadir empresa</BotonAnadir>
        <Table
          columnas={["CUIT", "Nombre", "Razón social", "Estado", "Email", "Teléfono"]}
          columnaEditar={true}
          datos={datos}
          modalHandle={setModal}
          idHandle={setIdUpdate}
          stateHandle={CambiarEstado}
        />
      </section>
    </>
  );
};