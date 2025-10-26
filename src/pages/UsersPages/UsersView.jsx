import React, { useEffect, useState } from "react";
import { BotonAnadir } from "../../components/BotonAnadir";
import { BotonBuscar } from "../../components/BotonBuscar";
import { Table } from "../../components/Table";
import { Sidebar } from "../../components/Sidebar";
import { LogOut } from "../../components/LogOut";
import { Navigate } from "react-router-dom";

import '../../styles/Users.css';
import '../../styles/Modal.css';
import UsuarioServicio from "../../services/UsuarioServicio";
import { Form } from "../../components/Form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import CrearUsuarioYUP from "../../schemas/CrearUsuarioYUP";
import InputControl from "../../validation/InputControl";
import EmpresaServicio from "../../services/EmpresaServicio";
import { VisualForm } from "../../components/VisualForm";

export const UsersView = () => {

    const [rol, setRol] = useState("Administrador"); // Cambiar rol a Admin desde acá 
    const [datos, setDatos] = useState([]);
    const [rolesBBDD, setRolesBBDD] = useState([]);

    const [modal, setModal] = useState(false);
    const [modalContact, setModalContact] = useState(false);

    const [idUpdate, setIdUpdate] = useState("");
    const [alertWithoutModal, setAlertWithoutModal] = useState(false);
    const [resultAPI, setResultAPI] = useState();

    useEffect(() => {
        document.title = "Usuarios - ProStockConstructora";

        const rootDiv = document.getElementById("root");
        rootDiv.className = "pagedivided";
    }, []);

    useEffect(() => {
        if (rol == "Superadministrador") {
            UsuarioServicio.ObtenerAdministradores().then(datos => { setDatos(datos.data); });
            EmpresaServicio.obtenerEmpresasAAsociar().then(datos => { setDatosEmpresas(datos.data); });
        } else if (rol == "Administrador") {
            RecargarTabla();
            UsuarioServicio.ObtenerRoles().then(datos => { setRolesBBDD(datos.data); })
        }
    }, [rol]);

    useEffect(() => {
        if (alertWithoutModal) setTimeout(() => setAlertWithoutModal(false), 5000);
    }, [alertWithoutModal])

    useEffect(() => {
        if (idUpdate != 0) CargarDatos(idUpdate);
    }, [idUpdate]);

    const { register, formState: { errors }, handleSubmit, reset, setValue } =
        useForm({ resolver: yupResolver(CrearUsuarioYUP), mode: "onChange" });

    // API BACKEND REQUESTS
    const RecargarTabla = () => {
        UsuarioServicio.ObtenerUsuariosEmpresa(1).then(datos => { setDatos(datos.data); })
    }

    const CrearUsuario = (datos) => {
        if (rol == "Administrador") {
            const datosCorregidos = {
                ...datos,
                EmpresaId: 1,
                Roles: [datos.Roles]
            }
            UsuarioServicio.CrearUsuario(datosCorregidos).then(d => {
                setAlertWithoutModal(true);
                setResultAPI(d.data);
                CerrarModal(d.data);
            }).catch(e => {
                setAlertWithoutModal(true);
                setResultAPI("Error:" + e.response.data);
            });
        }
    }

    const CargarDatos = (id) => {
        UsuarioServicio.ObtenerUsuarioPorId(id).then(d => {
            setValue("Id", d.data.id);
            setValue("NombreUsuario", d.data.nombreUsuario);
            setValue("Email", d.data.email);
            setValue("Celular", d.data.telefono);
            setValue("Estado", d.data.estado);
            setValue("Roles", d.data.roles[0].replaceAll(" ", "").toUpperCase().normalize("NFD").replaceAll(/[\u0300-\u036f]/g, ""));
            setValue("EmpresaId", 1);
        })
    }

    const ActualizarUsuario = (datos) => {
        const datosCorregidos = {
            ...datos,
            EmpresaId: 1,
            Roles: [datos.Roles]
        }
        UsuarioServicio.ActualizarUsuario(idUpdate, datosCorregidos).then(d => {
            setAlertWithoutModal(true);
            setResultAPI(d.data);
            CerrarModal(d.data);
        }).catch(e => {
            setAlertWithoutModal(true);
            setResultAPI("Error:" + e.response.data);
        });
    }

    const CambiarEstado = async (id) => {
        await UsuarioServicio.CambiarEstadoUsuario(id).then(d => {
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
        if (idUpdate == "") CrearUsuario(d);
        else ActualizarUsuario(d);
    }

    const onErrors = (e) => {
        console.log("Errores:", e);
    }

    const CerrarModal = (res = "") => {
        setModal(false);
        setModalContact(false);
        if (idUpdate != "" || !res.includes("Error")) reset();
        if (!res.includes("Error")) RecargarTabla();
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
                    <Form title={idUpdate == 0 ? "Registrar usuario" : "Actualizar usuario"}
                        buttonMsg={idUpdate == 0 ? "Añadir usuario" : "Actualizar usuario"}
                        handleSubmit={handleSubmit(onSubmit, onErrors)} closeModal={() => CerrarModal()}
                        inputs={[
                            {
                                "type": "text",
                                "required": true,
                                "icon": "person",
                                "register": register,
                                "registerData": "NombreUsuario",
                                "errors": errors,
                                "keyHandle": e => InputControl.sinCaracteresEspeciales(e),
                                "info": "Ingrese el nombre de usuario:"
                            },
                            {
                                "type": "email",
                                "icon": "mail",
                                "register": register,
                                "registerData": "Email",
                                "errors": errors,
                                "info": "Ingrese el email(opcional):"
                            },
                            {
                                "type": "tel",
                                "icon": "call",
                                "register": register,
                                "registerData": "Celular",
                                "errors": errors,
                                "info": "Ingrese el teléfono (opcional):"
                            },
                            {
                                "type": "select",
                                "select": rolesBBDD,
                                "required": true,
                                "register": register,
                                "registerData": "Roles",
                                "errors": errors,
                                "icon": "assignment_ind",
                                "info": "Asigne a este usuario su rol:"
                            }
                        ]}
                    />
                    :
                    <></>
            }
            {
                modalContact ?
                    <VisualForm closeModal={() => CerrarModal()} title={"Datos de contacto"}
                        inputs={[{
                            "type": "input",
                            "info": "Email",
                            "icon": "mail",
                            "register": register,
                            "registerData": "Email"
                        },
                        {
                            "type": "input",
                            "info": "Teléfeno",
                            "icon": "call",
                            "register": register,
                            "registerData": "Celular"
                        }
                        ]} />
                    :
                    <></>
            }
            <Sidebar />
            <section className="Users">
                <>
                    {
                        rol == "Administrador" ?
                            <>
                                <LogOut />
                                <div className="upPart">
                                    <BotonBuscar>Buscar</BotonBuscar>
                                    <BotonAnadir setOnClick={() => setModal(true)}>Añadir usuario</BotonAnadir>
                                </div>
                                <Table
                                    columnas={["Nombre de usuario", "Estado", "Rol"]}
                                    opciones={[{ contacto: setModalContact }, "editar", "desactivar"]}
                                    datos={datos}
                                    camposAExcluir={["id", "email", "telefono"]}
                                    modalHandle={setModal}
                                    idHandle={setIdUpdate}
                                    stateHandle={CambiarEstado}
                                /></> : <Navigate to={"/not-access"} />
                    }
                </>
            </section>
        </>
    );
}


/// OLD CODE
// rol == "Superadministrador" ?
//     <>
//         <LogOut />
//         <div className="upPart">
//             <BotonBuscar>Buscar</BotonBuscar>
//             <BotonAnadir setOnClick={() => setModal(true)}>Añadir administrador</BotonAnadir>
//         </div>
//         <Table
//             columnas={["Nombre de usuario", "Email", "Teléfono", "Estado", "Empresa"]}
//             columnaEditar={true}
//             datos={datos}
//         />
//     </>
//     : 